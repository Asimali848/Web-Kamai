import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { TaskCard } from '@/components/ui/task-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Search, Filter, Target, Upload, Camera, FileText, User, Users } from 'lucide-react';

export function AvailableTasks() {
  const { user } = useAuth();
  const { tasks, submitTask, assignTask } = useTask();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);
  const [submissionData, setSubmissionData] = useState({
    text: '',
    screenshotUrl: '',
  });

  const availableTasks = tasks.filter(task => {
    if (task.status !== 'approved') return false;
    
    if (task.taskType === 'single') {
      return !task.assignedUserId; // Only show if not assigned
    } else {
      return (task.currentCompletions || 0) < (task.maxCompletions || 1); // Show if not fully completed
    }
  });
  
  const filteredTasks = availableTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTaskAction = (action: string, task: any) => {
    if (action === 'start') {
      if (!user) return;

      // For single-person tasks, assign the task to the user first
      if (task.taskType === 'single') {
        assignTask(task.id, user.id, user.name);
        toast({
          title: "Task assigned!",
          description: "This task has been assigned to you. Complete it to earn the reward.",
        });
      }

      setSelectedTask(task);
      setSubmissionData({ text: '', screenshotUrl: '' });
      setShowSubmissionDialog(true);
    }
  };

  const handleSubmissionSubmit = () => {
    if (!selectedTask || !user) return;

    if (!submissionData.text && !submissionData.screenshotUrl) {
      toast({
        title: "Missing submission",
        description: "Please provide either submission notes or a screenshot.",
        variant: "destructive",
      });
      return;
    }

    submitTask({
      taskId: selectedTask.id,
      userId: user.id,
      userName: user.name,
      submissionText: submissionData.text || undefined,
      screenshotUrl: submissionData.screenshotUrl || undefined,
      status: 'submitted',
      rewardAmount: selectedTask.reward,
    });

    toast({
      title: "Task submitted!",
      description: "Your submission has been sent for review.",
    });

    setShowSubmissionDialog(false);
    setSelectedTask(null);
    setSubmissionData({ text: '', screenshotUrl: '' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      // For demo, we'll use a placeholder image
      setSubmissionData(prev => ({
        ...prev,
        screenshotUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=500'
      }));
    }
  };

  const singlePersonTasks = filteredTasks.filter(task => task.taskType === 'single');
  const multiplePersonTasks = filteredTasks.filter(task => task.taskType === 'multiple');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Available Tasks</h1>
        <p className="text-gray-600">Choose tasks to complete and earn rewards</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Tasks</p>
                <p className="text-2xl font-bold">{availableTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Single Person</p>
                <p className="text-2xl font-bold">{singlePersonTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Multiple Person</p>
                <p className="text-2xl font-bold">{multiplePersonTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rewards</p>
                <p className="text-2xl font-bold">
                  ${availableTasks.reduce((sum, task) => sum + task.reward, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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

      {/* Tasks Grid */}
      <div className="space-y-6">
        {/* Single Person Tasks */}
        {singlePersonTasks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Single Person Tasks</h2>
              <span className="text-sm text-gray-500">({singlePersonTasks.length} available)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {singlePersonTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="user"
                />
              ))}
            </div>
          </div>
        )}

        {/* Multiple Person Tasks */}
        {multiplePersonTasks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold">Multiple Person Tasks</h2>
              <span className="text-sm text-gray-500">({multiplePersonTasks.length} available)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {multiplePersonTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAction={handleTaskAction}
                  showActions={true}
                  actionType="user"
                />
              ))}
            </div>
          </div>
        )}

        {/* No Tasks Available */}
        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No matching tasks found' : 'No tasks available'}
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Try adjusting your search terms or clearing filters'
                  : 'Check back later for new tasks to complete'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Task Submission Dialog */}
      <Dialog open={showSubmissionDialog} onOpenChange={setShowSubmissionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complete Task</DialogTitle>
            <DialogDescription>
              Submit your completed work for review
            </DialogDescription>
          </DialogHeader>
          
          {selectedTask && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">{selectedTask.title}</h3>
                <p className="text-sm text-gray-600">{selectedTask.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Reward:</span>
                    <span className="font-medium text-green-600">${selectedTask.reward}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Type:</span>
                    <span className="font-medium">
                      {selectedTask.taskType === 'single' ? 'Single Person' : 'Multiple Person'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedTask.requirements && selectedTask.requirements.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-medium">Requirements:</Label>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedTask.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="submissionText">Submission Notes</Label>
                <Textarea
                  id="submissionText"
                  placeholder="Describe what you've completed and any relevant details..."
                  value={submissionData.text}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, text: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Screenshot/Proof (Optional)</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('screenshot-upload')?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Screenshot
                    </Button>
                  </div>
                  
                  {submissionData.screenshotUrl && (
                    <div className="space-y-2">
                      <p className="text-sm text-green-600">Screenshot uploaded successfully!</p>
                      <img
                        src={submissionData.screenshotUrl}
                        alt="Screenshot preview"
                        className="w-full max-h-48 object-contain rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmissionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmissionSubmit}>
              <Upload className="w-4 h-4 mr-1" />
              Submit Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}