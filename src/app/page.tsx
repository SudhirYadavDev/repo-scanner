import LandingPage from "@/components/home/LandingPage";
import { incrementWebsiteVisits } from "./actions/websiteVisits";

export default async function HomePage() {
  await incrementWebsiteVisits();

  return <LandingPage />;
}