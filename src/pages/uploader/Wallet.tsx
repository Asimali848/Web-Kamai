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
    ArrowUpRight,
    ArrowDownLeft,
    Calendar,
    DollarSign,
    TrendingDown,
    CreditCard,
    Lock,
    Shield
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function UploaderWallet() {
    const { user } = useAuth();
    const { getUserBalance, updateUserBalance, addTransaction, transactions, tasks } = useTask();
    const [showDepositDialog, setShowDepositDialog] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');

    if (!user) return null;

    const userBalance = getUserBalance(user.id);
    const userTransactions = transactions
        .filter(t => t.userId === user.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const myTasks = tasks.filter(t => t.uploaderId === user.id);
    const totalEscrowHeld = userTransactions
        .filter(t => t.type === 'escrow_hold' && t.status === 'completed')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalSpent = userTransactions
        .filter(t => t.type === 'escrow_release' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const handleDeposit = () => {
        const amount = parseFloat(depositAmount);

        if (!amount || amount <= 0) {
            toast({
                title: "Invalid amount",
                description: "Please enter a valid deposit amount.",
                variant: "destructive",
            });
            return;
        }

        // Process deposit
        updateUserBalance(user.id, amount);
        addTransaction({
            userId: user.id,
            type: 'deposit',
            amount: amount,
            description: `Deposit from credit card`,
            status: 'completed',
        });

        toast({
            title: "Deposit successful!",
            description: `$${amount} has been added to your wallet.`,
        });

        setShowDepositDialog(false);
        setDepositAmount('');
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'deposit':
                return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
            case 'escrow_hold':
                return <Lock className="w-4 h-4 text-yellow-600" />;
            case 'escrow_release':
                return <ArrowUpRight className="w-4 h-4 text-blue-600" />;
            default:
                return <DollarSign className="w-4 h-4 text-gray-600" />;
        }
    };

    const getTransactionColor = (type: string) => {
        switch (type) {
            case 'deposit':
                return 'text-green-600';
            case 'escrow_hold':
                return 'text-yellow-600';
            case 'escrow_release':
                return 'text-blue-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">My Wallet</h1>
                <p className="text-gray-600">Manage your funds and task payments</p>
            </div>

            {/* Wallet Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Available Balance</p>
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
                                <p className="text-sm font-medium text-gray-600">Held in Escrow</p>
                                <p className="text-2xl font-bold text-yellow-600">${totalEscrowHeld - totalSpent}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                <p className="text-2xl font-bold text-blue-600">${totalSpent}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <TrendingDown className="w-6 h-6 text-blue-600" />
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
                            <Plus className="w-5 h-5 mr-2" />
                            Add Funds
                        </CardTitle>
                        <CardDescription>
                            Deposit money to create and fund tasks
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => setShowDepositDialog(true)}
                            className="w-full"
                        >
                            <ArrowDownLeft className="w-4 h-4 mr-2" />
                            Deposit Money
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Payment Methods
                        </CardTitle>
                        <CardDescription>
                            Manage your payment methods
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <CreditCard className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm">Credit Card ****1234</span>
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

            {/* Escrow Information */}
            <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                    <CardTitle className="flex items-center text-yellow-800">
                        <Shield className="w-5 h-5 mr-2" />
                        Escrow Protection
                    </CardTitle>
                    <CardDescription className="text-yellow-700">
                        Your funds are safely held in escrow until tasks are completed
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                            <p className="text-sm text-gray-600">Active Tasks</p>
                            <p className="text-xl font-bold text-blue-600">{myTasks.filter(t => t.status !== 'completed' && t.status !== 'rejected').length}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                            <p className="text-sm text-gray-600">Funds in Escrow</p>
                            <p className="text-xl font-bold text-yellow-600">${totalEscrowHeld - totalSpent}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                            <p className="text-sm text-gray-600">Completed Payments</p>
                            <p className="text-xl font-bold text-green-600">${totalSpent}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

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
                                    Deposit funds to start creating tasks!
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Deposit Dialog */}
            <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Funds</DialogTitle>
                        <DialogDescription>
                            Deposit money to your wallet to create and fund tasks
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Current Balance</Label>
                            <div className="text-2xl font-bold text-green-600">${userBalance}</div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="depositAmount">Deposit Amount</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input
                                    id="depositAmount"
                                    type="number"
                                    placeholder="0.00"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    className="pl-10"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDepositAmount('50')}
                            >
                                $50
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDepositAmount('100')}
                            >
                                $100
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDepositAmount('250')}
                            >
                                $250
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDepositAmount('500')}
                            >
                                $500
                            </Button>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <Shield className="w-4 h-4 inline mr-1" />
                                Your funds are protected with bank-level security
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDepositDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleDeposit}>
                            <Plus className="w-4 h-4 mr-1" />
                            Deposit ${depositAmount || '0'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}