export type Feedback = {
    rating: number;
    strengths: string[];
    improvements: string[];
  };

export type Case = {
    id: string;
    title: string;
    timestamp: Date;
    category: string;
  };

export type messageTypes = "multiple-choice" | "select" | "number" | undefined;
export type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  type?: messageTypes;
  options?: string[];
};