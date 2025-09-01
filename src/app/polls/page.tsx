import { PollList } from "@/components/polls/poll-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Polls",
  description: "View all polls",
};

export default function PollsPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Polls</h1>
        <Button asChild>
          <Link href="/polls/create">Create Poll</Link>
        </Button>
      </div>
      <PollList />
    </div>
  );
}