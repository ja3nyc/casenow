import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <MessageCircle className="h-6 w-6" />
      <span className="text-xl font-bold">CaseNow</span>
    </Link>
  );
}
