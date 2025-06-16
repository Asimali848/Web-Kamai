import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Plus,
  FileText,
  Eye,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function UploaderDashboard() {
  const { user } = useAuth();
  const { tasks, submissions } = useTask();

  const myTasks = tasks.filter(task => task.uploaderId === user?.id);
  const pendingTasks = myTasks.filter(task => task.status === 'pending');
  const approvedTasks = myTasks.filter(task => task.status === 'approved');
  const submittedTasks = myTasks.filter(task => task.status === 'submitted');
  const completedTasks = myTasks.filter(task => task.status === 'completed');

  const totalRewards = completedTasks.reduce((sum, task) => sum + task.reward, 0);

  const stats = [
    {
      title: 'Total Tasks',
      value: myTasks.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Approval',
      value: pendingTasks.length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Need Review',
      value: submittedTasks.length,
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Completed',
      value: completedTasks.length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  const quickActions = [
    {
      title: 'Create New Task',
      description: 'Add a new task for workers to complete',
      icon: Plus,
      to: '/uploader/add-task',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Review Submissions',
      description: 'Audit completed task submissions',
      icon: Eye,
      to: '/uploader/audit',
      color: 'bg-purple-500 hover:bg-purple-600',
      badge: submittedTasks.length > 0 ? submittedTasks.length : undefined,
    },
    {
      title: 'Manage Tasks',
      description: 'View and edit your existing tasks',
      icon: FileText,
      to: '/uploader/my-tasks',
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Manage your tasks and track performance</p>
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
                    {action.badge && (
                      <Badge className="bg-red-500 text-white">
                        {action.badge}
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

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Total Rewards Distributed</span>
              <span className="text-lg font-bold text-green-600">${totalRewards}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Success Rate</span>
              <span className="text-lg font-bold text-blue-600">
                {myTasks.length > 0 ? Math.round((completedTasks.length / myTasks.length) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Avg. Completion Time</span>
              <span className="text-lg font-bold text-purple-600">2.3 days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submittedTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-gray-500">Needs review</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">
                    Submitted
                  </Badge>
                </div>
              ))}
              {submittedTasks.length === 0 && (
                <p className="text-center text-gray-500 py-4">No recent submissions to review</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}