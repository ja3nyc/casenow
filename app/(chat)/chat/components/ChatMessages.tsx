"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useFormatter, useNow } from "next-intl";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Message } from "../types";

type ChatMessagesProps = {
  messages: Message[];
  setMessages: React.Dispatch<SetStateAction<Message[]>>;
};

const chatVariants = cva("max-w-[70%] rounded-t-3xl p-3 ", {
  variants: {
    variant: {
      default: "",
      user: "bg-indigo-600 rounded-bl-3xl rounded-br-md text-white",
      bot: "bg-white border rounded-br-3xl rounded-bl-md border-gray-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const ChatBubble = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> &
    VariantProps<typeof chatVariants> & {
      message: Message;
      setMessages: React.Dispatch<SetStateAction<Message[]>>;
      isActive: boolean;
    }
>(({ className, variant, message, setMessages, isActive, ...props }, ref) => {
  const format = useFormatter();
  const now = useNow({
    updateInterval: 1000 * 10,
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSubmit = () => {
    // Handle submission logic here
    // Simulate bot responses
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        text: "Selected some options",
        sender: "user",
        timestamp: new Date(),
      },
    ]);
    setTimeout(() => {
      const randomType =
        Math.random() >= 0.67
          ? "number"
          : Math.random() >= 0.33
          ? "select"
          : "multiple-choice";
      const baseOptions = [
        "I assumed the average lifespan of a bicycle.",
        "I estimated the population and percentage of bike owners.",
        "I considered the impact of e-bikes on the market.",
        "I factored in economic trends affecting bicycle sales.",
      ];
      const additionalOptions = [
        "I analyzed seasonal trends in bicycle sales.",
        "I considered the impact of urban vs. rural demographics.",
        "I looked at the market share of different bicycle types (mountain, road, hybrid).",
        "I factored in the influence of cycling events and competitions on sales.",
      ];

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "That's an interesting approach. Can you elaborate on your assumptions?",
        sender: "bot",
        type: randomType,
        options:
          randomType === "select"
            ? [...baseOptions, ...additionalOptions]
            : randomType === "multiple-choice"
            ? baseOptions
            : undefined,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case "multiple-choice":
        return (
          <div className="mt-2">
            {message.options?.map((option, index) => (
              <button
                key={index}
                disabled={!isActive}
                className={`block w-full text-left p-2 mt-1 rounded ${
                  selectedOption === option
                    ? "bg-indigo-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case "select":
        return (
          <div className="mt-2">
            {message.options?.map((option, index) => (
              <button
                key={index}
                disabled={!isActive}
                className={`block w-full text-left p-2 mt-1 rounded ${
                  selectedOptions.includes(option)
                    ? "bg-indigo-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedOptions((prev) =>
                    prev.includes(option)
                      ? prev.filter((item) => item !== option)
                      : [...prev, option]
                  );
                }}
              >
                {option}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      key={message.id}
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } ${className}`}
    >
      <div className={cn(chatVariants({ variant }))}>
        <p className="text-sm">{message.text}</p>
        {renderMessageContent()}
        {(message.type === "multiple-choice" || message.type === "select") && (
          <button
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        <p
          className={`text-xs  mt-1
          ${message.sender === "user" ? "text-gray-200" : "text-gray-400"}`}
        >
          {format.relativeTime(message.timestamp, now)}
        </p>
      </div>
    </div>
  );
});

export default function ChatMessages({
  messages,
  setMessages,
}: ChatMessagesProps) {
  const format = useFormatter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea className="flex-1 px-4 scroll-smooth">
      <div className="space-y-4 py-4">
        {messages.map((message, index) => (
          <ChatBubble
            isActive={index === messages.length - 1}
            key={message.id}
            variant={message.sender}
            message={message}
            setMessages={setMessages}
            className={cn(
              index === 0 && "pt-4",
              index === messages.length - 1 && "pb-4"
            )}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
