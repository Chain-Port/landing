"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WaitListFormValues, waitlistFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const form = useForm<WaitListFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(waitlistFormSchema),
  });

  const onSubmit = (values: WaitListFormValues) => {
    setIsSending(true);

    const fakeApi = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 2000);
    });

    fakeApi.then(() => {
      toast.success("Message sent! I will reply to you soon.");
      setIsSending(false);
    });

    // fetch("/api/send", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then(() => toast.success("Message sent! I will reply to you soon."))
    //   .catch(() => toast.error("Failed to send message."))
    //   .finally(() => setIsSending(false));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 mt-16"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  className="bg-secondary border-0"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your email"
                  className="border-0 bg-secondary"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                I will use this email to reply to you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message"
                  className="border-0 bg-secondary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSending}>
          {isSending && <LoaderIcon className="animate-spin mr-2" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
