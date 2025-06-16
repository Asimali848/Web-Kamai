import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  Trophy,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserDashboard() {
  const { user } = useAuth();
  const { tasks, submissions } = useTask();

  const availableTasks = tasks.filter(task => task.status === 'approved');
  const mySubmissions = submissions.filter(sub => sub.userId === user?.id);
  const completedTasks = mySubmissions.filter(sub => sub.status === 'approved');
  const totalEarnings = completedTasks.reduce((sum, sub) => {
    const task = tasks.find(t => t.id === sub.taskId);
    return sum + (task?.reward || 0);
  }, 0);

  const stats = [
    {
      title: 'Available Tasks',
      value: availableTasks.length,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Ready to start',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks.length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Successfully finished',
    },
    {
      title: 'Total Earnings',
      value: `$${totalEarnings}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'Money earned',
    },
    {
      title: 'Success Rate',
      value: `${mySubmissions.length > 0 ? Math.round((completedTasks.length / mySubmissions.length) * 100) : 0}%`,
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Approval rate',
    },
  ];

  const quickActions = [
    {
      title: 'Browse Tasks',
      description: `${availableTasks.length} tasks available to complete`,
      icon: Target,
      to: '/user/tasks',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'My Submissions',
      description: 'View your submitted tasks and status',
      icon: FileText,
      to: '/user/submissions',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Completed Tasks',
      description: 'Review your completed work',
      icon: CheckCircle,
      to: '/user/completed',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  const recentTasks = availableTasks.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Ready to earn some money? Let's get started!</p>
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
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Tasks & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Featured Tasks
            </CardTitle>
            <CardDescription>High-paying tasks available now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">
                      ${task.reward}
                    </Badge>
                    <Link to="/user/tasks">
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              {recentTasks.length === 0 && (
                <p className="text-center text-gray-500 py-4">No tasks available right now</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Tasks Completed</span>
              <span className="text-lg font-bold text-green-600">{completedTasks.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Total Earnings</span>
              <span className="text-lg font-bold text-emerald-600">${totalEarnings}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Pending Review</span>
              <span className="text-lg font-bold text-yellow-600">
                {mySubmissions.filter(s => s.status === 'submitted').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Success Rate</span>
              <span className="text-lg font-bold text-purple-600">
                {mySubmissions.length > 0 ? Math.round((completedTasks.length / mySubmissions.length) * 100) : 0}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}