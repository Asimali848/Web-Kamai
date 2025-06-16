import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { TaskCard } from '@/components/ui/task-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MyTasks() {
  const { user } = useAuth();
  const { tasks, unassignTask } = useTask();
  const [searchQuery, setSearchQuery] = useState('');

  const myTasks = tasks.filter(task => task.uploaderId === user?.id);
  
  const filterTasks = (status?: string) => {
    let filtered = myTasks;
    
    if (status) {
      filtered = filtered.filter(task => task.status === status);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleTaskAction = (action: string, task: any) => {
    if (action === 'unassign') {
      unassignTask(task.id);
      toast({
        title: "Task unassigned",
        description: "The task has been made available to all users again.",
      });
    }
  };

  const statusCounts = {
    all: myTasks.length,
    pending: myTasks.filter(t => t.status === 'pending').length,
    approved: myTasks.filter(t => t.status === 'approved').length,
    in_progress: myTasks.filter(t => t.status === 'in_progress').length,
    submitted: myTasks.filter(t => t.status === 'submitted').length,
    completed: myTasks.filter(t => t.status === 'completed').length,
    rejected: myTasks.filter(t => t.status === 'rejected').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-gray-600">Manage and track your created tasks</p>
        </div>
        <Link to="/uploader/add-task">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tasks Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all" className="relative">
            All
            {statusCounts.all > 0 && (
              <Badge className="ml-2 h-5 min-w-[20px] text-xs">
                {statusCounts.all}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending
            {statusCounts.pending > 0 && (
              <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-yellow-500">
                {statusCounts.pending}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="relative">
            Approved
            {statusCounts.approved > 0 && (
              <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-green-500">
                {statusCounts.approved}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="in_progress" className="relative">
            In Progress
            {statusCounts.in_progress > 0 && (
              <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-blue-500">
                {statusCounts.in_progress}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="submitted" className="relative">
            Submitted
            {statusCounts.submitted > 0 && (
              <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-purple-500">
                {statusCounts.submitted}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="relative">
            Completed
            {statusCounts.completed > 0 && (
              <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-emerald-500">
                {statusCounts.completed}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected" className="relative">
            Rejected
            {statusCounts.rejected > 0 && (
              <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-red-500">
                {statusCounts.rejected}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTasks().length > 0 ? (
              filterTasks().map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="uploader"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No tasks found matching your criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTasks('pending').length > 0 ? (
              filterTasks('pending').map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="uploader"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No pending tasks</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTasks('approved').length > 0 ? (
              filterTasks('approved').map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="uploader"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No approved tasks</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTasks('in_progress').length > 0 ? (
              filterTasks('in_progress').map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="uploader"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No tasks in progress</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTasks('submitted').length > 0 ? (
              filterTasks('submitted').map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="uploader"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No submitted tasks</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTasks('completed').length > 0 ? (
              filterTasks('completed').map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="uploader"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No completed tasks</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTasks('rejected').length > 0 ? (
              filterTasks('rejected').map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="uploader"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No rejected tasks</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}