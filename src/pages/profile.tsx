import {
  BarChart2,
  ChevronRight,
  CircleHelp,
  FileText,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <div className="mx-auto flex h-screen w-full flex-col p-4 pt-28">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="mr-3 h-12 w-12">
                <AvatarImage src="/api/placeholder/40/40" alt="User avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-blue-500">My superior: 234509</p>
                <h2 className="font-bold">Account: 3004242424</h2>
                <p className="text-sm">Invitation code: 8456279</p>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="mb-4 flex items-center">
            <div className="mr-2 flex flex-1 items-center rounded-lg bg-gray-100 p-2">
              <div className="mr-2 rounded bg-gray-700 p-1">
                <BarChart2 size={16} className="text-white" />
              </div>
              <span>Balance</span>
              <span className="ml-2 font-semibold">0Rs</span>
            </div>
            <Button
              className="rounded-lg bg-teal-500 text-white"
              size="sm"
              onClick={() => navigate("/profile/wallet")}
            >
              My wallet
            </Button>
          </div>

          {/* Earnings Grid */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <Card className="bg-gray-100 shadow-none">
              <CardContent className="p-3">
                <p className="mb-2 text-center text-xs">Today's earnings(Rs)</p>
                <p className="text-center text-lg font-semibold text-teal-500">
                  0.00
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 shadow-none">
              <CardContent className="p-3">
                <p className="mb-2 text-center text-xs">
                  This month's earnings(Rs)
                </p>
                <p className="text-center text-lg font-semibold text-teal-500">
                  0.00
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 shadow-none">
              <CardContent className="p-3">
                <p className="mb-2 text-center text-xs">
                  Last month's earnings(Rs)
                </p>
                <p className="text-center text-lg font-semibold text-teal-500">
                  0.00
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 shadow-none">
              <CardContent className="p-3">
                <p className="mb-2 text-center text-xs">Total revenue(Rs)</p>
                <p className="text-center text-lg font-semibold text-teal-500">
                  0.00
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 shadow-none">
              <CardContent className="p-3">
                <p className="mb-2 text-center text-xs">
                  Complete the remaining tasks today(PCL)
                </p>
                <p className="text-center text-lg font-semibold text-teal-500">
                  0
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 shadow-none">
              <CardContent className="p-3">
                <p className="mb-2 text-center text-xs">Today's tasks(PCL)</p>
                <p className="text-center text-lg font-semibold text-teal-500">
                  0
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between bg-white py-6"
            >
              <div className="flex items-center">
                <div className="mr-3 rounded bg-green-100 p-2">
                  <User size={18} className="text-green-600" />
                </div>
                <span>Personal information</span>
              </div>
              <ChevronRight size={18} />
            </Button>

            <Button
              variant="ghost"
              className="flex w-full items-center justify-between bg-white py-6"
            >
              <div className="flex items-center">
                <div className="mr-3 rounded bg-orange-100 p-2">
                  <BarChart2 size={18} className="text-orange-600" />
                </div>
                <span>Daily statement</span>
              </div>
              <ChevronRight size={18} />
            </Button>

            <Button
              variant="ghost"
              className="flex w-full items-center justify-between bg-white py-6"
            >
              <div className="flex items-center">
                <div className="mr-3 rounded bg-blue-100 p-2">
                  <TrendingUp size={18} className="text-blue-600" />
                </div>
                <span>Accounting records</span>
              </div>
              <ChevronRight size={18} />
            </Button>

            <Button
              variant="ghost"
              className="flex w-full items-center justify-between bg-white py-6"
            >
              <div className="flex items-center">
                <div className="mr-3 rounded bg-pink-100 p-2">
                  <Users size={18} className="text-pink-600" />
                </div>
                <span>Invite Friends</span>
              </div>
              <ChevronRight size={18} />
            </Button>

            <Button
              variant="ghost"
              className="flex w-full items-center justify-between bg-white py-6"
            >
              <div className="flex items-center">
                <div className="mr-3 rounded bg-purple-200 p-2">
                  <FileText size={18} className="text-purple-600" />
                </div>
                <span>Team Reports</span>
              </div>
              <ChevronRight size={18} />
            </Button>

            <Button
              variant="ghost"
              className="flex w-full items-center justify-between bg-white py-6"
            >
              <div className="flex items-center">
                <div className="mr-3 rounded bg-yellow-200/80 p-2">
                  <CircleHelp size={18} className="text-yellow-600/80" />
                </div>
                <span>Help Book</span>
              </div>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
