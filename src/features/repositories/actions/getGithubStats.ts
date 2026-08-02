"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getGithubStats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const account = await db.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  if (!account?.accessToken) {
    throw new Error("GitHub access token not found.");
  }

  const headersConfig = {
    Authorization: `Bearer ${account.accessToken}`,
    Accept: "application/vnd.github+json",
  };

  const [profileResponse, reposResponse] = await Promise.all([
    fetch("https://api.github.com/user", {
      headers: headersConfig,
      cache: "no-store",
    }),

    fetch("https://api.github.com/user/repos?per_page=100", {
      headers: headersConfig,
      cache: "no-store",
    }),
  ]);

  if (!profileResponse.ok || !reposResponse.ok) {
    throw new Error("Failed to fetch GitHub data.");
  }

  const profile = await profileResponse.json();
  const repositories = await reposResponse.json();

  let totalContributions = 0;

  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= 2008; year--) {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query($from: DateTime!, $to: DateTime!) {
              viewer {
                contributionsCollection(
                  from: $from,
                  to: $to
                ) {
                  contributionCalendar {
                    totalContributions
                  }
                }
              }
            }
          `,
        variables: {
          from: `${year}-01-01T00:00:00Z`,
          to: `${year}-12-31T23:59:59Z`,
        },
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    totalContributions +=
      data.data.viewer.contributionsCollection.contributionCalendar
        .totalContributions;
  }

  const startOfYear = new Date(currentYear, 0, 1).toISOString();

  const endOfYear = new Date().toISOString();

  const currentYearContributionResponse = await fetch(
    "https://api.github.com/graphql",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($from: DateTime!, $to: DateTime!) {
            viewer {
              contributionsCollection(
                from: $from,
                to: $to
              ) {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }
        `,
        variables: {
          from: startOfYear,
          to: endOfYear,
        },
      }),
      cache: "no-store",
    },
  );

  const currentYearContributionData =
    await currentYearContributionResponse.json();

  if (currentYearContributionData.errors) {
    throw new Error(currentYearContributionData.errors[0].message);
  }

  const currentYearContributions =
    currentYearContributionData.data.viewer.contributionsCollection
      .contributionCalendar.totalContributions;

  const totalStars = repositories.reduce(
    (total: number, repo: { stargazers_count: number }) =>
      total + repo.stargazers_count,
    0,
  );

  return {
    totalRepositories:
      profile.public_repos + (profile.total_private_repos ?? 0),

    totalStars,

    publicRepositories: profile.public_repos,

    privateRepositories: profile.total_private_repos ?? 0,

    totalContributions,

    currentYearContributions,
  };
}
