import LandingPage from "@/components/home/LandingPage";

import { getVisitCount } from "@/features/visits/actions/getVisitCount";

export default async function HomePage() {
  const { visits, showCounter } = await getVisitCount();

  return (
    <LandingPage
      visits={visits}
      showCounter={showCounter}
    />
  );
}