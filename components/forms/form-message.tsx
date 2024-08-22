"use client";

import { useEffect } from "react";
import { useToast } from "../ui/use-toast";

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  const { toast } = useToast();
  useEffect(() => {
    const isMessage = "message" in message;
    const isError = "error" in message;
    const isSuccess = "success" in message;
    if (isMessage) {
      toast({
        title: message.message,
        duration: 3000,
      });
    } else if (isError) {
      toast({
        title: message.error,
        variant: "destructive",
        duration: 3000,
      });
    } else if (isSuccess) {
      toast({
        title: message.success,
        variant: "success",
        duration: 3000,
      });
    }
  }, [message]);
  return <></>;
}
