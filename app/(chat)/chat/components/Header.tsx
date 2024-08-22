"use client";
import { getUser } from "@/app/hooks/getUser";
import { useSidebar } from "@/app/providers/sidebar-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import {
  BarChart,
  HelpCircle,
  Menu,
  MessageSquare,
  Settings,
} from "lucide-react";
import { SetStateAction } from "react";
import { Feedback } from "../types";

export default function Header({
  feedback,
  setFeedback,
  setIsFeedbackOpen,
}: {
  feedback: Feedback | null;
  setFeedback: React.Dispatch<SetStateAction<Feedback | null>>;
  setIsFeedbackOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const supabase = createClient();
  const { data: user, isLoading } = getUser({
    supabase,
  });
  const { toggleSidebar } = useSidebar();
  const handleRequestFeedback = () => {
    // In a real application, you would make an API call to get feedback from the AI
    // For this example, we'll simulate the AI generating feedback
    const simulatedFeedback: Feedback = {
      rating: Math.floor(Math.random() * 101), // Random rating between 0 and 100
      strengths: [
        "Clear problem structuring",
        "Logical approach to market segmentation",
        "Good use of data-driven assumptions",
      ],
      improvements: [
        "Consider additional market factors",
        "Provide more detailed calculations",
        "Explore potential market trends",
      ],
    };
    setFeedback(simulatedFeedback);
    setIsFeedbackOpen(true);
  };
  return (
    <header className="bg-white border-b max-h-14 border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage
            src={user?.user_metadata?.avatar_url || "/placeholder-user.jpg"}
            alt="User"
          />
          <AvatarFallback>
            {user?.email?.[0].toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="h-8 flex flex-col justify-center">
          <h2 className="font-semibold text-sm leading-tight">
            {user?.user_metadata?.full_name || user?.email || "Anonymous"}
          </h2>
          <p className="text-xs text-gray-500 leading-tight">
            {user?.user_metadata?.plan || "Free User"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <BarChart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRequestFeedback}>
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
