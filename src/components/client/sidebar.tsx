"use client";

import { useState } from "react";
import {
  Home,
  Settings,
  ChevronLeft,
  ChartNoAxesCombined,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`relative border-r ${
        isCollapsed ? "w-16" : "w-32 md:w-52"
      } transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="absolute top-[12px] -right-[16px] z-20">
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-md w-8 h-8"
          variant="outline"
          size="icon"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform ease-in-out duration-700",
              isCollapsed === false ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </div>
      <div className="flex flex-col h-full py-4">
        <nav className="space-y-2 flex-grow">
          <Link href="/protected/home">
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Home className="h-5 w-5 mr-2" />
              {!isCollapsed && <span>Home</span>}
            </Button>
          </Link>

          <Link href="/protected/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <ChartNoAxesCombined className="h-5 w-5 mr-2" />
              {!isCollapsed && <span>DashBoard</span>}
            </Button>
          </Link>

        </nav>
        <Button
          variant="ghost"
          className="w-full justify-start"
        >
          <Settings className="h-5 w-5 mr-2" />
          {!isCollapsed && <span>Settings</span>}
        </Button>
      </div>
    </div>
  );
}
