import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { Plus, X, DollarSign, FileText, Tag, List, Users, User, Wallet, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  'Content Creation',
  'Social Media',
  'Data Entry',
  'Research',
  'Testing',
  'Design',
  'Marketing',
  'Other',
];

export function AddTask() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addTask, getUserBalance } = useTask();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    reward: '',
    requirements: [''],
    tags: [''],
    taskType: 'single' as 'single' | 'multiple',
    maxCompletions: '1',
  });

  const userBalance = user ? getUserBalance(user.id) : 0;
  const totalCost = formData.taskType === 'single'
    ? parseFloat(formData.reward) || 0
    : (parseFloat(formData.reward) || 0) * (parseInt(formData.maxCompletions) || 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, ''],
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    if (totalCost > userBalance) {
      toast({
        title: "Insufficient balance",
        description: `You need $${totalCost} but only have $${userBalance}. Please add funds to your wallet.`,
        variant: "destructive",
      });
      return;
    }

    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        reward: parseFloat(formData.reward),
        uploaderId: user.id,
        uploaderName: user.name,
        status: 'pending' as const,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        taskType: formData.taskType,
        maxCompletions: formData.taskType === 'multiple' ? parseInt(formData.maxCompletions) : 1,
      };

      addTask(taskData);

      toast({
        title: "Task created successfully!",
        description: `Your task has been submitted for admin approval. $${totalCost} has been held in escrow.`,
      });

      navigate('/uploader/my-tasks');
    } catch (error: any) {
      toast({
        title: "Failed to create task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Task</h1>
        <p className="text-gray-600">Add a new task for workers to complete</p>
      </div>

      {/* Wallet Balance Alert */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Wallet Balance: ${userBalance}</span>
            </div>
            {totalCost > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Total Cost:</span>
                <Badge className={totalCost > userBalance ? "bg-red-500" : "bg-green-500"}>
                  ${totalCost}
                </Badge>
              </div>
            )}
          </div>
          {totalCost > userBalance && totalCost > 0 && (
            <Alert className="mt-3 border-red-200 bg-red-50">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="text-red-800">
                Insufficient balance. You need ${totalCost - userBalance} more to create this task.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Task Details
            </CardTitle>
            <CardDescription>
              Provide clear and detailed information about the task
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Task Assignment Type</Label>
              {/* <RadioGroup
                value={formData.taskType}
                onValueChange={(value: 'single' | 'multiple') =>
                  setFormData(prev => ({ ...prev, taskType: value, maxCompletions: value === 'single' ? '1' : '5' }))
                }
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="single" id="single" />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <Label htmlFor="single" className="font-medium cursor-pointer">
                        Single Person Task
                      </Label>
                      <p className="text-sm text-gray-600">Only one person can work on this task</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="multiple" id="multiple" />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <Label htmlFor="multiple" className="font-medium cursor-pointer">
                        Multiple Person Task
                      </Label>
                      <p className="text-sm text-gray-600">Multiple people can complete this task</p>
                    </div>
                  </div>
                </div>
              </RadioGroup> */}
              <RadioGroup
                value={formData.taskType}
                onValueChange={(value: 'single' | 'multiple') =>
                  setFormData(prev => ({ ...prev, taskType: value, maxCompletions: value === 'single' ? '1' : '5' }))
                }
                className="space-y-3"
              >
                {/* Single Person Task Option */}
                <Label htmlFor="single" className="block">
                  <div className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors cursor-pointer 
      ${formData.taskType === 'single' ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-50'}`}
                  >

                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${formData.taskType === 'single' ? 'bg-blue-200' : 'bg-blue-100'}`}>
                        <User className={`w-4 h-4 ${formData.taskType === 'single' ? 'text-blue-700' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <span className="font-medium">Single Person Task</span>
                        <p className="text-sm text-gray-600">Only one person can work on this task</p>
                      </div>
                    </div>
                    <RadioGroupItem
                      value="single"
                      id="single"
                      className={cn("text-blue-600 border-white focus:ring-0 focus:ring-offset-0 p-2 ",
                        formData.taskType === 'single' && "bg-blue-500 border-blue-500"
                      )}
                    />
                  </div>
                </Label>

                {/* Multiple Person Task Option */}
                <Label htmlFor="multiple" className="block">
                  <div className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors cursor-pointer 
      ${formData.taskType === 'multiple' ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-50'}`}
                  >

                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${formData.taskType === 'multiple' ? 'bg-green-200' : 'bg-green-100'}`}>
                        <Users className={`w-4 h-4 ${formData.taskType === 'multiple' ? 'text-green-700' : 'text-green-600'}`} />
                      </div>
                      <div>
                        <span className="font-medium">Multiple Person Task</span>
                        <p className="text-sm text-gray-600">Multiple people can complete this task</p>
                      </div>
                    </div>
                    <RadioGroupItem
                      value="multiple"
                      id="multiple"
                      className={cn("text-blue-600 border-white focus:ring-0 focus:ring-offset-0 p-2 ",
                        formData.taskType === 'multiple' && "bg-blue-500 border-blue-500"
                      )}
                    />
                  </div>
                </Label>
              </RadioGroup>
            </div>

            {formData.taskType === 'multiple' && (
              <div className="space-y-2">
                <Label htmlFor="maxCompletions">Maximum Completions</Label>
                <Input
                  id="maxCompletions"
                  name="maxCompletions"
                  type="number"
                  placeholder="How many people can complete this task?"
                  value={formData.maxCompletions}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  required
                />
                <p className="text-xs text-gray-500">
                  Total cost will be: ${parseFloat(formData.reward) || 0} × {formData.maxCompletions} = ${totalCost}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a clear, descriptive title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reward">Reward per Completion ($) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="reward"
                    name="reward"
                    type="number"
                    placeholder="0.00"
                    value={formData.reward}
                    onChange={handleInputChange}
                    className="pl-10"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description of what needs to be done..."
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <List className="w-4 h-4 mr-2" />
                  Requirements
                </Label>
                <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Requirement
                </Button>
              </div>
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter a requirement..."
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {formData.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags
                </Label>
                <Button type="button" variant="outline" size="sm" onClick={addTag}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Tag
                </Button>
              </div>
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter a tag..."
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {formData.tags.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTag(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {formData.title && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Preview</h3>
                <div className="space-y-2">
                  <h4 className="font-semibold">{formData.title}</h4>
                  <p className="text-sm text-gray-600">{formData.description}</p>
                  <div className="flex items-center space-x-2">
                    {formData.category && (
                      <Badge variant="outline">{formData.category}</Badge>
                    )}
                    {formData.reward && (
                      <Badge className="bg-green-100 text-green-800">
                        ${formData.reward} each
                      </Badge>
                    )}
                    <Badge className={formData.taskType === 'single' ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
                      {formData.taskType === 'single' ? 'Single Person' : `${formData.maxCompletions} People`}
                    </Badge>
                  </div>
                  {totalCost > 0 && (
                    <div className="text-sm text-gray-600">
                      <strong>Total Cost: ${totalCost}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/uploader')}>
            Cancel
          </Button>
          <Button type="submit" disabled={totalCost > userBalance} className='bg-blue-500 hover:bg-blue-100 hover:text-blue-500 hover:border-blue-500'>
            {totalCost > userBalance ? 'Insufficient Balance' : 'Create Task'}
          </Button>
        </div>
      </form>
    </div>
  );
}