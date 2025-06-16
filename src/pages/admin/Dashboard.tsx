import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Shield,
  FileText,
  Clock,
  CheckCircle,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const { user } = useAuth();
  const { tasks, submissions } = useTask();

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const approvedTasks = tasks.filter(task => task.status === 'approved');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const totalRewards = completedTasks.reduce((sum, task) => sum + task.reward, 0);

  const stats = [
    {
      title: 'Pending Approval',
      value: pendingTasks.length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Tasks awaiting approval',
    },
    {
      title: 'Active Tasks',
      value: approvedTasks.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Currently active tasks',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks.length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Successfully completed',
    },
    {
      title: 'Total Rewards',
      value: `$${totalRewards}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'Distributed to workers',
    },
  ];

  const quickActions = [
    {
      title: 'Review Pending Tasks',
      description: `${pendingTasks.length} tasks need your approval`,
      icon: Clock,
      to: '/admin/pending',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      urgent: pendingTasks.length > 0,
    },
    {
      title: 'Manage Users',
      description: 'View and manage platform users',
      icon: Users,
      to: '/admin/users',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'View All Tasks',
      description: 'Monitor all tasks on the platform',
      icon: FileText,
      to: '/admin/approved',
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.to}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    {action.urgent && (
                      <Badge className="bg-red-500 text-white">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions.slice(0, 5).map((submission) => {
                const task = tasks.find(t => t.id === submission.taskId);
                return (
                  <div key={submission.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{task?.title}</p>
                      <p className="text-xs text-gray-500">by {submission.userName}</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      {submission.status}
                    </Badge>
                  </div>
                );
              })}
              {submissions.length === 0 && (
                <p className="text-center text-gray-500 py-4">No recent submissions</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Platform Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Total Tasks</span>
              <span className="text-lg font-bold text-blue-600">{tasks.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Success Rate</span>
              <span className="text-lg font-bold text-green-600">
                {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Active Users</span>
              <span className="text-lg font-bold text-purple-600">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Platform Health</span>
              <Badge className="bg-green-100 text-green-800">Excellent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}