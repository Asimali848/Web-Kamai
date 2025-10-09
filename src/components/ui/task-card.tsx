import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';
import { 
  Calendar, 
  DollarSign, 
  User, 
  Users, 
  CheckCircle, 
  XCircle, 
  Play, 
  Clock,
  Eye,
  UserX
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onAction?: (action: string, task: Task) => void;
  showActions?: boolean;
  actionType?: 'admin' | 'user' | 'uploader';
}

export function TaskCard({ task, onAction, showActions = false, actionType }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'approved':
        return <CheckCircle className="w-3 h-3" />;
      case 'in_progress':
        return <Play className="w-3 h-3" />;
      case 'submitted':
        return <Eye className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'rejected':
        return <XCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const isTaskAvailable = () => {
    if (task.taskType === 'single') {
      return task.status === 'approved' && !task.assignedUserId;
    } else {
      return task.status === 'approved' && (task.currentCompletions || 0) < (task.maxCompletions || 1);
    }
  };

  const renderActions = () => {
    if (!showActions || !onAction) return null;

    switch (actionType) {
      case 'admin':
        if (task.status === 'pending') {
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onAction('approve', task)}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onAction('reject', task)}
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          );
        }
        break;

      case 'user':
        if (isTaskAvailable()) {
          return (
            <Button
              size="sm"
              onClick={() => onAction('start', task)}
              className="w-full"
            >
              <Play className="w-4 h-4 mr-1" />
              Start Task
            </Button>
          );
        }
        break;

      case 'uploader':
        if (task.taskType === 'single' && task.assignedUserId && task.status === 'in_progress') {
          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAction('unassign', task)}
              className="w-full"
            >
              <UserX className="w-4 h-4 mr-1" />
              Unassign Task
            </Button>
          );
        }
        break;
    }

    return null;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
            <CardDescription className="line-clamp-2">{task.description}</CardDescription>
          </div>
          <Badge className={getStatusColor(task.status)}>
            {getStatusIcon(task.status)}
            <span className="ml-1 capitalize">{task.status.replace('_', ' ')}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-1" />
            <span>{task.uploaderName}</span>
          </div>
          <div className="flex items-center font-medium text-green-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>${task.reward}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <Badge variant="outline">{task.category}</Badge>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
          </div>
        </div>

        {/* Task Type and Assignment Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              {task.taskType === 'single' ? (
                <User className="w-4 h-4 mr-1 text-blue-600" />
              ) : (
                <Users className="w-4 h-4 mr-1 text-green-600" />
              )}
              <span className="text-gray-600">
                {task.taskType === 'single' ? 'Single Person' : 'Multiple People'}
              </span>
            </div>
            {task.taskType === 'multiple' && (
              <span className="text-sm text-gray-500">
                {task.currentCompletions || 0}/{task.maxCompletions || 1} completed
              </span>
            )}
          </div>

          {task.assignedUserId && (
            <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
              Assigned to: {task.assignedUserName}
            </div>
          )}
        </div>

        {task.requirements && task.requirements.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">Requirements:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {task.requirements.slice(0, 2).map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">{req}</span>
                </li>
              ))}
              {task.requirements.length > 2 && (
                <li className="text-gray-500">+{task.requirements.length - 2} more...</li>
              )}
            </ul>
          </div>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {task.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{task.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="h-full">
          {renderActions()}
        </div>
      </CardContent>
    </Card>
  );
}