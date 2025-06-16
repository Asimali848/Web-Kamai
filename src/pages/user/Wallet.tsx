import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
    Wallet,
    Plus,
    Minus,
    ArrowUpRight,
    ArrowDownLeft,
    Calendar,
    DollarSign,
    TrendingUp,
    CreditCard,
    Banknote
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function UserWallet() {
    const { user } = useAuth();
    const { getUserBalance, updateUserBalance, addTransaction, transactions } = useTask();
    const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');

    if (!user) return null;

    const userBalance = getUserBalance(user.id);
    const userTransactions = transactions
        .filter(t => t.userId === user.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const totalEarnings = userTransactions
        .filter(t => t.type === 'earning' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalWithdrawals = userTransactions
        .filter(t => t.type === 'withdrawal' && t.status === 'completed')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount);

        if (!amount || amount <= 0) {
            toast({
                title: "Invalid amount",
                description: "Please enter a valid withdrawal amount.",
                variant: "destructive",
            });
            return;
        }

        if (amount > userBalance) {
            toast({
                title: "Insufficient balance",
                description: "You don't have enough balance for this withdrawal.",
                variant: "destructive",
            });
            return;
        }

        // Process withdrawal
        updateUserBalance(user.id, -amount);
        addTransaction({
            userId: user.id,
            type: 'withdrawal',
            amount: -amount,
            description: `Withdrawal to bank account`,
            status: 'completed',
        });

        toast({
            title: "Withdrawal successful!",
            description: `$${amount} has been withdrawn from your wallet.`,
        });

        setShowWithdrawDialog(false);
        setWithdrawAmount('');
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'earning':
                return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
            case 'withdrawal':
                return <ArrowUpRight className="w-4 h-4 text-red-600" />;
            case 'deposit':
                return <ArrowDownLeft className="w-4 h-4 text-blue-600" />;
            default:
                return <DollarSign className="w-4 h-4 text-gray-600" />;
        }
    };

    const getTransactionColor = (type: string) => {
        switch (type) {
            case 'earning':
            case 'deposit':
                return 'text-green-600';
            case 'withdrawal':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">My Wallet</h1>
                <p className="text-gray-600">Manage your earnings and withdrawals</p>
            </div>

            {/* Wallet Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                                <p className="text-3xl font-bold text-green-600">${userBalance}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Wallet className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                                <p className="text-2xl font-bold text-blue-600">${totalEarnings}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Withdrawn</p>
                                <p className="text-2xl font-bold text-purple-600">${totalWithdrawals}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Banknote className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Minus className="w-5 h-5 mr-2" />
                            Withdraw Funds
                        </CardTitle>
                        <CardDescription>
                            Transfer your earnings to your bank account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => setShowWithdrawDialog(true)}
                            disabled={userBalance <= 0}
                            className="w-full"
                        >
                            <ArrowUpRight className="w-4 h-4 mr-2" />
                            Withdraw Money
                        </Button>
                        {userBalance <= 0 && (
                            <p className="text-sm text-gray-500 mt-2 text-center">
                                No funds available for withdrawal
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Payment Methods
                        </CardTitle>
                        <CardDescription>
                            Manage your withdrawal methods
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <Banknote className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm">Bank Account</span>
                                </div>
                                <Badge variant="outline">Primary</Badge>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                                Add Payment Method
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction History */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Transaction History
                    </CardTitle>
                    <CardDescription>
                        View all your wallet transactions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {userTransactions.length > 0 ? (
                            userTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            {getTransactionIcon(transaction.type)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{transaction.description}</p>
                                            <p className="text-xs text-gray-500">
                                                {formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                                        </p>
                                        <Badge
                                            className={
                                                transaction.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : transaction.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                            }
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                                <p className="text-gray-600">
                                    Complete tasks to start earning money!
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Withdraw Dialog */}
            <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                        <DialogDescription>
                            Enter the amount you want to withdraw from your wallet
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Available Balance</Label>
                            <div className="text-2xl font-bold text-green-600">${userBalance}</div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="withdrawAmount">Withdrawal Amount</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input
                                    id="withdrawAmount"
                                    type="number"
                                    placeholder="0.00"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    className="pl-10"
                                    min="0"
                                    max={userBalance}
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setWithdrawAmount((userBalance * 0.25).toFixed(2))}
                            >
                                25%
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setWithdrawAmount((userBalance * 0.5).toFixed(2))}
                            >
                                50%
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setWithdrawAmount((userBalance * 0.75).toFixed(2))}
                            >
                                75%
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setWithdrawAmount(userBalance.toFixed(2))}
                            >
                                Max
                            </Button>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleWithdraw}>
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                            Withdraw ${withdrawAmount || '0'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}