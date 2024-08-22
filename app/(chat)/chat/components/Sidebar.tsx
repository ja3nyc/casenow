"use client";
import { useSidebar } from "@/app/providers/sidebar-provider";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { X, Zap } from "lucide-react";
import { useFormatter, useNow } from "next-intl";
import { useEffect, useState } from "react";
import { Case } from "../types";

type SidebarProps = {
  cases: Case[];
  activeCase: string;
  setActiveCase: (id: string) => void;
};

export default function Sidebar({
  cases,
  activeCase,
  setActiveCase,
}: SidebarProps) {
  const now = useNow({
    updateInterval: 1000 * 10,
  });
  const format = useFormatter();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sidebarContent = (
    <>
      <div className="p-4 max-h-14 border-b border-gray-200 flex justify-between items-center">
        <Logo />
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {cases.map((caseItem) => (
          <button
            key={caseItem.id}
            className={`w-full text-left px-2 pt-2 `}
            onClick={() => {
              setActiveCase(caseItem.id);
              if (isMobile) toggleSidebar();
            }}
          >
            <div
              className={`hover:bg-gray-100 p-2 rounded-xl ${
                activeCase === caseItem.id
                  ? "bg-indigo-100 text-indigo-600"
                  : ""
              }`}
            >
              <p className="font-medium">{caseItem.title}</p>
              <p className="text-xs">
                {format.relativeTime(caseItem.timestamp, now)}
              </p>
            </div>
          </button>
        ))}
      </div>
      <div className="p-2 border-t max-h-14 border-gray-200">
        <Button variant="outline" className="w-full">
          <Zap className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>
    </>
  );

  if (!isClient) {
    return null; // or a loading placeholder
  }

  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-64 transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
    >
      {sidebarContent}
    </div>
  );
}
