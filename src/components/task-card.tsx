import { useEffect, useState } from "react";

import { SquareChartGantt } from "lucide-react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Dummy tasks
const tasks = [
  {
    id: 1,
    remaining: 5,
    status: "Doing",
    amount: 2000,
    request: "Complete survey",
  },
  {
    id: 2,
    remaining: 3,
    status: "Doing",
    amount: 1500,
    request: "Watch video",
  },
  {
    id: 3,
    remaining: 2,
    status: "Audits",
    amount: 1800,
    request: "Verify documents",
  },
  {
    id: 4,
    remaining: 0,
    status: "Completed",
    amount: 2200,
    request: "App installation",
  },
  {
    id: 5,
    remaining: 1,
    status: "Failed",
    amount: 1000,
    request: "Invalid submission",
  },
];

const tabs = [
  { id: "Doing", label: "Doing" },
  { id: "Audits", label: "Audits" },
  { id: "Completed", label: "Completed" },
  { id: "Failed", label: "Failed" },
];

const TaskCard = ({
  remaining,
  status,
  amount,
  request,
}: {
  remaining: number;
  status: string;
  amount: number;
  request: string;
}) => {
  const getBadgeProps = () => {
    switch (status) {
      case "Doing":
        return {
          text: "Receiving",
          color: "text-green-700",
          border: "border-green-500",
        };
      case "Audits":
        return {
          text: "Auditing",
          color: "text-blue-700",
          border: "border-blue-500",
        };
      case "Completed":
        return {
          text: "Completed",
          color: "text-gray-700",
          border: "border-gray-500",
        };
      case "Failed":
        return {
          text: "Failed",
          color: "text-red-700",
          border: "border-red-500",
        };
      default:
        return {
          text: "Unknown",
          color: "text-gray-700",
          border: "border-gray-500",
        };
    }
  };

  const { text, color, border } = getBadgeProps();

  return (
    <Card className="w-full space-y-3 rounded-2xl p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="h-6"
          />
          <div className="text-sm font-semibold">Demand side: *****941811</div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span
            className={`font-semibold ${status === "Failed" ? "text-red-600" : "text-green-600"}`}
          >
            {status}
          </span>
          <span className="font-semibold text-primary">Rs {amount}</span>
        </div>
      </div>

      <CardContent className="flex flex-col space-y-2 p-0">
        <div className="text-sm text-gray-600">
          Remaining: <span className="font-semibold">{remaining}</span>
        </div>
        <div className="text-sm">Request: {request}</div>
        <div className="flex justify-end">
          <Badge variant="outline" className={`${color} ${border}`}>
            {text}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("Doing");

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredTasks = tasks.filter((task) => task.status === activeTab);

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed z-40 w-full transition-all duration-300 ${isScrolled ? "bg-[#0B294B]" : "bg-[#0B294B]"}`}
      >
        <MaxWidthWrapper className="flex h-16 items-center justify-between">
          <div className="z-30 flex items-center font-semibold">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="Logo"
              className="w-44 rounded-sm"
            />
          </div>

          <div className="hidden h-full items-center gap-6 lg:flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer rounded-md p-2 font-semibold backdrop-blur-lg transition-colors lg:text-lg ${
                  activeTab === tab.id
                    ? "bg-blue-500/20 text-white"
                    : "text-gray-300 hover:bg-blue-500/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <SquareChartGantt className="size-6 cursor-pointer" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-5">
                <nav className="flex flex-col gap-4 text-lg font-medium">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="cursor-pointer text-left transition-colors hover:text-blue-600"
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Content */}
      <div className="mt-20 space-y-4 p-4">
        <MaxWidthWrapper className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                remaining={task.remaining}
                status={task.status}
                amount={task.amount}
                request={task.request}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No tasks found.
            </div>
          )}
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Dashboard;
