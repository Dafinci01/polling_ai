import { PollDetail } from "@/components/polls/poll-detail";

export const metadata = {
  title: "Poll Details",
  description: "View poll details and vote",
};

interface PollPageProps {
  params: {
    id: string;
  };
}

export default function PollPage({ params }: PollPageProps) {
  return (
    <div className="container py-10">
      <PollDetail id={params.id} />
    </div>
  );
}