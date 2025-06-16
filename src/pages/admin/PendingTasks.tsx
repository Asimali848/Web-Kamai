import React from 'react';
import { useTask } from '@/context/TaskContext';
import { TaskCard } from '@/components/ui/task-card';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export function PendingTasks() {
  const { tasks, updateTaskStatus } = useTask();

  const pendingTasks = tasks.filter(task => task.status === 'pending');

  const handleTaskAction = (action: string, task: any) => {
    if (action === 'approve') {
      updateTaskStatus(task.id, 'approved');
      toast({
        title: "Task approved!",
        description: `${task.title} is now available for workers.`,
      });
    } else if (action === 'reject') {
      updateTaskStatus(task.id, 'rejected');
      toast({
        title: "Task rejected",
        description: `${task.title} has been rejected.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Pending Tasks</h1>
        <p className="text-gray-600">Review and approve tasks submitted by uploaders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">
                  ${pendingTasks.reduce((sum, task) => sum + task.reward, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Reward</p>
                <p className="text-2xl font-bold">
                  ${pendingTasks.length > 0 ?
                    Math.round(pendingTasks.reduce((sum, task) => sum + task.reward, 0) / pendingTasks.length) :
                    0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tasks Awaiting Approval</h2>

        {pendingTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onAction={handleTaskAction}
                showActions={true}
                actionType="admin"
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">
                There are no tasks pending approval at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}