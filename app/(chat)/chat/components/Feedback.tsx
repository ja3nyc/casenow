import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUpCircle, ThumbsUp, X } from "lucide-react";
import { SetStateAction } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Feedback } from "../types";

export default function FeedbackPane({
  feedback,
  isFeedbackOpen,
  setIsFeedbackOpen,
}: {
  feedback: Feedback | null;
  isFeedbackOpen: boolean;
  setIsFeedbackOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!feedback) return null;

  const feedbackContent = (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">AI Feedback</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFeedbackOpen(false)}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Overall Rating</h3>
        <div className="flex items-center">
          <Progress value={feedback.rating} className="flex-grow mr-4" />
          <span className="font-bold">{feedback.rating}/100</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Things Done Well</h3>
        <ul className="list-disc pl-5 space-y-1">
          {feedback.strengths.map((item, index) => (
            <li key={index} className="text-sm">
              <ThumbsUp className="inline h-4 w-4 mr-2 text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Areas for Improvement</h3>
        <ul className="list-disc pl-5 space-y-1">
          {feedback.improvements.map((item, index) => (
            <li key={index} className="text-sm">
              <ArrowUpCircle className="inline h-4 w-4 mr-2 text-amber-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isFeedbackOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsFeedbackOpen(false)}
    >
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-96 bg-white transition-transform duration-300 ${
          isFeedbackOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {feedbackContent}
      </div>
    </div>
  );
}
