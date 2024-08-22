"use client";
import { useState } from "react";
import { Case, Feedback, Message } from "../types";
import ChatMessages from "./ChatMessages";
import FeedbackPane from "./Feedback";
import Footer from "./Footer";
import Header from "./Header";
import InputArea from "./InputArea";
import Sidebar from "./Sidebar";

export default function ChatComponent({
  params,
}: {
  params: { id: string[] };
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to your case interview practice! Let's start with a market sizing question. Estimate the number of bicycles sold annually in the United States.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [cases, setCases] = useState<Case[]>([
    {
      id: "1",
      title: "Market Sizing: Bicycles in US",
      category: "Market Sizing",
      timestamp: new Date(),
    },
    {
      id: "2",
      title: "Profitability: Tech Startup",
      category: "Profitability",
      timestamp: new Date(new Date().getTime() - 100000),
    },
    {
      id: "3",
      title: "Market Entry: EV in Europe",
      category: "Strategy",
      timestamp: new Date(new Date().getTime() - 500000),
    },
  ]);
  const [activeCase, setActiveCase] = useState<string>("1");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "That's an interesting approach. Can you elaborate on your assumptions?",
          sender: "bot",
          type: "multiple-choice",
          options: [
            "I assumed the average lifespan of a bicycle.",
            "I estimated the population and percentage of bike owners.",
            "I considered the impact of e-bikes on the market.",
            "I factored in economic trends affecting bicycle sales.",
          ],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        cases={cases}
        activeCase={activeCase}
        setActiveCase={setActiveCase}
      />
      <div className="flex-1 flex flex-col">
        <Header
          feedback={feedback}
          setFeedback={setFeedback}
          setIsFeedbackOpen={setIsFeedbackOpen}
        />
        <ChatMessages messages={messages} setMessages={setMessages} />
        <InputArea
          inputValue={inputValue}
          lastMessage={messages[messages.length - 1]}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
        />
        <Footer />
      </div>
      {isFeedbackOpen && (
        <FeedbackPane
          feedback={feedback}
          isFeedbackOpen={isFeedbackOpen}
          setIsFeedbackOpen={setIsFeedbackOpen}
        />
      )}
    </div>
  );
}
