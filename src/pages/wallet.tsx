import { useState } from "react";

import { ArrowLeft, Clock, Download, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WalletPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState("0.00Rs");
  const [transactions, setTransactions] = useState([
    {
      id: "OUT_250410920071803",
      amount: "28800",
      date: "2025-04-14 09:20:07",
      status: "Unpaid",
      type: "withdrawal",
    },
  ]);

  // New withdrawal form state
  const [withdrawalMethod, setWithdrawalMethod] = useState("jazzcash");
  const [cardDetails, setCardDetails] = useState("03**-*******");
  const [withdrawpin, setWithdrawPin] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [error, setError] = useState("");

  const handleWithdrawalSubmit = (e: any) => {
    e.preventDefault();
    // Add validation logic here if needed
    console.log("Withdrawal submitted:", {
      withdrawalMethod,
      cardDetails,
      withdrawpin,
      withdrawalAmount,
    });

    // Add logic to create a new transaction and update state
    const newTransaction = {
      id: `OUT_${Date.now()}`,
      amount: withdrawalAmount,
      date: new Date().toISOString().replace("T", " ").substring(0, 19),
      status: "Unpaid",
      type: "withdrawal",
    };

    setTransactions([newTransaction, ...transactions]);
    // Here you would also handle the API call to process the withdrawal
  };

  return (
    <MaxWidthWrapper>
      <div className="mx-auto flex h-screen w-full flex-col">
        {/* Header */}
        <div className="flex items-center p-4">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="mr-3 h-5 w-5" />
            <h1 className="text-lg font-medium">My wallet</h1>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="w-full bg-blue-400 text-white shadow-sm lg:mx-auto lg:w-[70%]">
          <CardContent className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold">{balance}</h2>
            </div>

            <div className="flex justify-between">
              <div className="flex w-full flex-col items-center justify-center">
                <Button
                  variant="ghost"
                  className="rounded-full bg-white/10 p-3 hover:bg-white/20"
                >
                  <Upload className="h-6 w-6 text-white" />
                </Button>
                <span className="mt-1 text-sm">Recharge</span>
              </div>

              <div className="border-r border-white/20"></div>

              <div className="flex w-full flex-col items-center justify-center">
                <Drawer>
                  <DrawerTrigger className="flex w-full flex-col items-center justify-center">
                    <Button
                      variant="ghost"
                      className="rounded-full bg-white/10 p-3 hover:bg-white/20"
                    >
                      <Download className="h-6 w-6 text-white" />
                    </Button>
                    <span className="mt-1 text-sm">Withdrawal</span>
                  </DrawerTrigger>
                  <DrawerContent className="mx-auto w-full lg:max-w-4xl">
                    <DrawerHeader>
                      <DrawerTitle>Withdraw</DrawerTitle>
                      <DrawerDescription>
                        Complete the form below to request a withdrawal.
                      </DrawerDescription>
                    </DrawerHeader>

                    {/* Withdrawal Form */}
                    <div className="px-4">
                      <form
                        onSubmit={handleWithdrawalSubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="withdrawalMethod"
                            className="text-sm text-gray-500"
                          >
                            Withdrawal method
                          </Label>
                          <Select
                            value={withdrawalMethod}
                            onValueChange={setWithdrawalMethod}
                          >
                            <SelectTrigger className="w-full bg-white">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jazzcash">jazzcash</SelectItem>
                              <SelectItem value="easypaisa">
                                easypaisa
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="cardDetails"
                            className="text-sm text-gray-500"
                          >
                            Account Number
                          </Label>
                          <Input
                            id="cardDetails"
                            value={cardDetails}
                            placeholder="03**-*******"
                            onChange={(e) => setCardDetails(e.target.value)}
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="cardDetails"
                            className="text-sm text-gray-500"
                          >
                            Withdraw Pin
                          </Label>
                          <Input
                            id="cardDetails"
                            value={withdrawpin}
                            placeholder="******"
                            onChange={(e) => setWithdrawPin(e.target.value)}
                            className="bg-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="withdrawalAmount"
                            className="text-sm text-gray-500"
                          >
                            Withdrawal amount
                          </Label>
                          <Input
                            id="withdrawalAmount"
                            value={withdrawalAmount}
                            placeholder="xxxx"
                            onChange={(e) =>
                              setWithdrawalAmount(e.target.value)
                            }
                            className="bg-white"
                          />
                        </div>

                        {error && (
                          <div className="text-sm text-red-500">{error}</div>
                        )}
                      </form>
                    </div>

                    <DrawerFooter>
                      <Button
                        type="button"
                        onClick={handleWithdrawalSubmit}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Submit
                      </Button>
                      <DrawerClose>
                        <Button variant="outline" className="w-full">
                          Cancel
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div className="mt-6 lg:mx-auto lg:w-[70%]">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-gray-500">Recharge record</span>
            <span className="font-medium text-emerald-500">
              Withdrawal record
            </span>
          </div>

          {/* Transaction List */}
          <div className="mt-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="mb-4">
                <div className="mb-1 flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                      <Clock className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{tx.id}</div>
                      <div className="font-semibold">{tx.amount}</div>
                    </div>
                  </div>
                  <Badge
                    variant={tx.status === "Unpaid" ? "outline" : "default"}
                    className="border border-red-500 text-xs font-semibold text-red-500"
                  >
                    {tx.status}
                  </Badge>
                </div>
                <div className="ml-11 text-xs text-gray-500">{tx.date}</div>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="mt-6 text-center text-sm text-gray-400">
                No more data
              </div>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
