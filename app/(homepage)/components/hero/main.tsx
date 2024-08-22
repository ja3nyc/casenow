"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

type Message = {
  text: string;
  sender: "bot" | "user";
};

export default function Hero() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Welcome to your case interview practice! Let's start with a market sizing question. Estimate the number of bicycles sold annually in the United States.",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
      setInputValue("");

      // Simulate bot response
      setTimeout(() => {
        let botResponse: string;
        switch (messages.length) {
          case 1:
            botResponse =
              "Great! What assumptions will you make to start your calculation?";
            break;
          case 3:
            botResponse =
              "Good assumptions. Now, how would you segment the market?";
            break;
          case 5:
            botResponse =
              "Excellent segmentation. Can you walk me through your calculation step-by-step?";
            break;
          default:
            botResponse =
              "That's a good point. What other factors might influence your estimate?";
        }
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      }, 1000);
    }
  };
  return (
    <main className="container max-w-6xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row items-center justify-between"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:w-1/2 mb-10 lg:mb-0"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Master consulting case interviews with{" "}
            <span className="text-primary">AI-powered practice</span>
          </h1>
          <p className="text-xl mb-8 max-w-lg">
            CaseNow is an intelligent chatbot that simulates real consulting
            case interviews. Practice with hundreds of cases, receive instant
            feedback, and improve your skills with personalized AI coaching.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="default"
              className="bg-primary text-white hover:bg-primary"
            >
              Try CaseNow Free →
            </Button>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:w-1/2"
        >
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 relative">
              {/* Try now text and arrow anchored to top right 
                It should be translated beyond the card with an arrow pointing towards the card
                it should be transparent
                */}
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-br from-pink-400 via-primary to-teal-400 text-white text-sm rounded-full px-4 py-2 shadow-lg">
                  Try Now
                </div>
                <div
                  className="w-4 h-4 bg-gradient-to-br from-pink-400 via-primary to-teal-400 rounded-full transform rotate-45 shadow-lg"
                  style={{
                    marginTop: "-0.5rem",
                    marginLeft: "calc(50% - 0.5rem)",
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MessageCircle className="h-6 w-6 text-primary mr-2" />
                  <span className="font-semibold">CaseNow</span>
                </div>
                <span className="text-sm text-gray-500">AI Assistant</span>
              </div>
              <div className="space-y-4 mb-4 h-80 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.sender === "bot" ? "bg-primary/20" : "bg-white"
                    } p-3 rounded-lg max-w-[80%] ${
                      message.sender === "user" ? "ml-auto" : ""
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <Input
                  placeholder="Type your response..."
                  className="flex-grow mr-2"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
}
