"use client";
import { Button } from "@/components/ui/button";
import { CurrencyInputField } from "@/components/ui/currency-input";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Message } from "../types";

type InputAreaProps = {
  inputValue: string;
  lastMessage: Message;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
};

export default function InputArea({
  inputValue,
  lastMessage,
  setInputValue,
  handleSendMessage,
}: InputAreaProps) {
  const isUserInput = !(
    lastMessage.sender === "bot" && lastMessage.type !== undefined
  );
  const isNumberInput = lastMessage.type === "number";
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center space-x-2">
        {!isNumberInput && (
          <Input
            placeholder={
              isUserInput ? "Type your response..." : "This is a user action."
            }
            className="flex-grow"
            disabled={!isUserInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
        )}
        {isNumberInput && (
          <CurrencyInputField
            placeholder={"Type your response..."}
            className="flex-grow"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
        )}
        <Button onClick={handleSendMessage}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
}
