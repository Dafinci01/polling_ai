import { PollCreateForm } from "@/components/polls/poll-create-form";

export const metadata = {
  title: "Create Poll",
  description: "Create a new poll",
};

export default function CreatePollPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create a New Poll</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new poll</p>
      </div>
      <div className="max-w-2xl">
        <PollCreateForm />
      </div>
    </div>
  );
}