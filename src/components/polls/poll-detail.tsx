"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

interface PollDetailProps {
  id: string;
}

export function PollDetail({ id }: PollDetailProps) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchPoll() {
      try {
        const response = await fetch(`/api/polls/${id}`);
        
        if (!response.ok) {
          throw new Error("Poll not found");
        }
        
        const data = await response.json();
        setPoll(data.poll);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch poll details",
        });
        router.push("/polls");
      } finally {
        setLoading(false);
      }
    }

    fetchPoll();
  }, [id, toast, router]);

  const handleVote = async () => {
    if (!selectedOption) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an option",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/polls/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ optionId: selectedOption }),
      });

      if (response.ok) {
        // Update the local state to reflect the vote
        if (poll) {
          const updatedOptions = poll.options.map((option) => {
            if (option.id === selectedOption) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          });

          setPoll({ ...poll, options: updatedOptions });
        }

        toast({
          title: "Success",
          description: "Your vote has been recorded",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit your vote",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">Poll not found</h2>
        <Button asChild>
          <a href="/polls">Back to Polls</a>
        </Button>
      </div>
    );
  }

  // Calculate total votes
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{poll.title}</CardTitle>
        <CardDescription>{poll.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            {poll.options.map((option) => {
              const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
              
              return (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1">
                    {option.text}
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    {option.votes} votes ({percentage}%)
                  </div>
                </div>
              );
            })}
          </RadioGroup>
          
          <div className="text-sm text-muted-foreground text-right">
            Total votes: {totalVotes}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/polls")}>
          Back to Polls
        </Button>
        <Button onClick={handleVote} disabled={submitting || !selectedOption}>
          {submitting ? "Submitting..." : "Vote"}
        </Button>
      </CardFooter>
    </Card>
  );
}