"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type PollOption = {
  id: string;
  text: string;
  votes: number;
};

type Poll = {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  createdBy: string;
  createdAt: string;
};

export function PollList() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPolls() {
      try {
        const response = await fetch("/api/polls");
        const data = await response.json();
        setPolls(data.polls);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch polls",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPolls();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">No polls found</h2>
        <p className="text-muted-foreground mb-4">Be the first to create a poll!</p>
        <Button asChild>
          <Link href="/polls/create">Create Poll</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {polls.map((poll) => (
        <Card key={poll.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{poll.title}</CardTitle>
            <CardDescription>{poll.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              {poll.options.slice(0, 2).map((option) => (
                <div key={option.id} className="flex justify-between">
                  <span>{option.text}</span>
                  <span className="text-muted-foreground">{option.votes} votes</span>
                </div>
              ))}
              {poll.options.length > 2 && (
                <div className="text-sm text-muted-foreground">
                  +{poll.options.length - 2} more options
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/polls/${poll.id}`}>View Poll</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}