import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ChatComponent from "../components/main";

export default async function ProtectedPage({
  params,
}: {
  params: {
    id: string[];
  };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col">
      <ChatComponent params={params} />
    </div>
  );
}
