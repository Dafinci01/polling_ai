"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  options: z.array(z.string().min(1, { message: "Option cannot be empty" })).min(2, {
    message: "You must add at least 2 options",
  }),
});

export function PollCreateForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      options: ["Option 1", "Option 2"],
    },
  });

  const { fields, append, remove } = form.control._formValues.options;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Poll created successfully",
        });
        router.push(`/polls/${data.poll.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Something went wrong",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const addOption = () => {
    const currentOptions = form.getValues().options;
    form.setValue("options", [...currentOptions, ""]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues().options;
    if (currentOptions.length <= 2) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must have at least 2 options",
      });
      return;
    }
    const newOptions = [...currentOptions];
    newOptions.splice(index, 1);
    form.setValue("options", newOptions);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poll Title</FormLabel>
              <FormControl>
                <Input placeholder="What's your favorite programming language?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide more details about your poll"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <FormLabel>Poll Options</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={addOption}>
              Add Option
            </Button>
          </div>

          {form.watch("options").map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`options.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={`Option ${index + 1}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOption(index)}
                className="h-10 w-10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/polls")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Poll"}
          </Button>
        </div>
      </form>
    </Form>
  );
}