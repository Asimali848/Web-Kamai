import { useEffect, useState } from "react";

import { SquareChartGantt } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "@/assets/img/looooooggooo.png";
import youtube from "@/assets/img/youtube.png";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  {
    id: 6,
    remaining: 10,
    status: "Get-Task",
    amount: 3000,
    request: "New task available",
  },
  {
    id: 7,
    remaining: 8,
    status: "Get-Task",
    amount: 2500,
    request: "Special offer task",
  },
];

const tabs = [
  { id: "Get-Task", label: "Get-Task" },
  { id: "Doing", label: "Doing" },
  { id: "Audits", label: "Audits" },
  { id: "Completed", label: "Completed" },
  { id: "Failed", label: "Failed" },
];

interface TaskCardProps {
  id: number;
  remaining: number;
  status: string;
  amount: number;
  request: string;
  onReceive: (id: number) => void;
}

const TaskCard = ({
  id,
  remaining,
  status,
  request,
  onReceive,
}: TaskCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/task-page");
  };

  const getBadgeProps = () => {
    switch (status) {
      case "Get-Task":
        return {
          text: "Receive",
          color: "text-green-700",
          border: "border-green-500",
        };
      case "Doing":
        return {
          text: "Received",
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
    <Card className="mt-20 h-5/6 w-full space-y-3 rounded-2xl p-4 shadow-md">
      <div>
        <div
          className="z-30 flex cursor-pointer items-center font-semibold"
          onClick={() => navigate("/")}
        >
          <img
            src={youtube}
            alt="Logo"
            className="h-12 w-28 rounded-sm bg-[#244d7fdd]"
          />
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <SquareChartGantt className="size-6 cursor-pointer text-white" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-5">
              <nav className="flex flex-col gap-4 text-lg font-medium">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className="cursor-pointer text-left transition-colors hover:text-blue-600"
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CardContent className="flex flex-col space-y-2 p-0">
        <div className="text-sm text-gray-600">
          Remaining: <span className="font-semibold">{remaining}</span>
        </div>
        <div className="text-sm">Request: {request}</div>
        <div className="flex justify-end">
          {status === "Get-Task" ? (
            <button
              onClick={() => onReceive(id)}
              className={`rounded-md border px-4 py-1 ${color} ${border} font-semibold transition hover:opacity-80`}
            >
              {text}
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="mr-2 text-sm font-semibold text-blue-500"
            >
              <Badge>View Details</Badge>
            </button>
          )}
          {status !== "Get-Task" && (
            <Badge variant="outline" className={`${color} ${border}`}>
              {text}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [_, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("Doing");
  const [taskList, setTaskList] = useState(tasks);

  const navigate = useNavigate();

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

  const handleReceiveTask = (id: number) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "Doing" } : task
      )
    );
    setActiveTab("Doing");
  };

  const filteredTasks = taskList.filter((task) => task.status === activeTab);

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed left-1/2 z-50 mx-auto mt-[20px] flex h-14 w-[95%] max-w-[1360px] -translate-x-1/2 transform items-center justify-between rounded-[70px] bg-[#244d7fdd] py-4 shadow-sm transition-all duration-300`}
      >
        <div className="flex h-14 w-full items-center justify-between px-10">
          <div
            className="z-30 flex cursor-pointer items-center font-semibold"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="Logo" className="h-12 w-28 rounded-sm" />
          </div>

          <div className="hidden h-full items-center gap-6 lg:flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer rounded-md p-2 font-semibold text-gray-100 backdrop-blur-lg transition-colors hover:bg-blue-500/20 lg:text-lg`}
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
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-4">
        <MaxWidthWrapper className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                remaining={task.remaining}
                status={task.status}
                amount={task.amount}
                request={task.request}
                onReceive={handleReceiveTask}
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
