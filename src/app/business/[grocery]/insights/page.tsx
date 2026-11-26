import AdvisorClient from "./advisor-client";

export const instant = false;

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ grocery: string }>;
}) {
  const { grocery } = await params;

  return <AdvisorClient businessId={grocery} />;
}