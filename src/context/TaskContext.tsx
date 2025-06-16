import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskSubmission, WalletTransaction } from '@/types';

interface TaskContextType {
  tasks: Task[];
  submissions: TaskSubmission[];
  transactions: WalletTransaction[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'currentCompletions' | 'isEscrowHeld'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  submitTask: (submission: Omit<TaskSubmission, 'id' | 'submittedAt'>) => void;
  auditSubmission: (submissionId: string, status: 'approved' | 'rejected', notes?: string) => void;
  assignTask: (taskId: string, userId: string, userName: string) => void;
  unassignTask: (taskId: string) => void;
  addTransaction: (transaction: Omit<WalletTransaction, 'id' | 'createdAt'>) => void;
  getUserBalance: (userId: string) => number;
  updateUserBalance: (userId: string, amount: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock initial data with enhanced task structure
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Write Product Review',
    description: 'Write a detailed review of our new mobile app on the App Store',
    category: 'Content Creation',
    reward: 25,
    uploaderId: '2',
    uploaderName: 'Task Creator',
    status: 'approved',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    requirements: ['Must be authentic', 'Include screenshots', 'At least 100 words'],
    tags: ['review', 'mobile', 'app store'],
    taskType: 'single',
    maxCompletions: 1,
    currentCompletions: 0,
    isEscrowHeld: true,
  },
  {
    id: '2',
    title: 'Social Media Post',
    description: 'Create an engaging Instagram post about productivity tips',
    category: 'Social Media',
    reward: 15,
    uploaderId: '2',
    uploaderName: 'Task Creator',
    status: 'pending',
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    requirements: ['Use provided hashtags', 'Include call-to-action', 'Professional image quality'],
    tags: ['instagram', 'productivity', 'social'],
    taskType: 'multiple',
    maxCompletions: 5,
    currentCompletions: 0,
    isEscrowHeld: false,
  },
];

const initialSubmissions: TaskSubmission[] = [
  {
    id: '1',
    taskId: '1',
    userId: '3',
    userName: 'Task Worker',
    submissionText: 'I completed the app store review as requested. The review is live and includes screenshots.',
    screenshotUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300',
    submittedAt: '2024-01-17T09:00:00Z',
    status: 'submitted',
    rewardAmount: 25,
  },
];

const initialTransactions: WalletTransaction[] = [
  {
    id: '1',
    userId: '2',
    type: 'escrow_hold',
    amount: -25,
    description: 'Escrow hold for task: Write Product Review',
    taskId: '1',
    status: 'completed',
    createdAt: '2024-01-15T10:00:00Z',
  },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(initialSubmissions);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(initialTransactions);
  const [userBalances, setUserBalances] = useState<Record<string, number>>({
    '1': 0,    // Admin
    '2': 475,  // Uploader (500 - 25 in escrow)
    '3': 125,  // User
  });

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'currentCompletions' | 'isEscrowHeld'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentCompletions: 0,
      isEscrowHeld: false,
    };

    // Calculate total escrow amount needed
    const totalEscrowAmount = taskData.taskType === 'single' 
      ? taskData.reward 
      : taskData.reward * (taskData.maxCompletions || 1);

    // Check if uploader has sufficient balance
    const uploaderBalance = getUserBalance(taskData.uploaderId);
    if (uploaderBalance < totalEscrowAmount) {
      throw new Error(`Insufficient balance. Need $${totalEscrowAmount}, have $${uploaderBalance}`);
    }

    // Hold funds in escrow
    updateUserBalance(taskData.uploaderId, -totalEscrowAmount);
    newTask.isEscrowHeld = true;

    // Add escrow transaction
    addTransaction({
      userId: taskData.uploaderId,
      type: 'escrow_hold',
      amount: -totalEscrowAmount,
      description: `Escrow hold for task: ${taskData.title}`,
      taskId: newTask.id,
      status: 'completed',
    });

    setTasks(prev => [newTask, ...prev]);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const submitTask = (submissionData: Omit<TaskSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: TaskSubmission = {
      ...submissionData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setSubmissions(prev => [newSubmission, ...prev]);
    updateTaskStatus(submissionData.taskId, 'submitted');
  };

  const auditSubmission = (submissionId: string, status: 'approved' | 'rejected', notes?: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    const task = tasks.find(t => t.id === submission.taskId);
    if (!task) return;

    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status, auditNotes: notes }
        : sub
    ));

    if (status === 'approved') {
      // Transfer payment from escrow to user
      updateUserBalance(submission.userId, submission.rewardAmount);
      
      // Add earning transaction for user
      addTransaction({
        userId: submission.userId,
        type: 'earning',
        amount: submission.rewardAmount,
        description: `Payment for completed task: ${task.title}`,
        taskId: task.id,
        status: 'completed',
      });

      // Add escrow release transaction for uploader
      addTransaction({
        userId: task.uploaderId,
        type: 'escrow_release',
        amount: submission.rewardAmount,
        description: `Escrow release for task: ${task.title}`,
        taskId: task.id,
        status: 'completed',
      });

      // Update task completion count
      if (task.taskType === 'multiple') {
        setTasks(prev => prev.map(t => 
          t.id === task.id 
            ? { 
                ...t, 
                currentCompletions: (t.currentCompletions || 0) + 1,
                status: (t.currentCompletions || 0) + 1 >= (t.maxCompletions || 1) ? 'completed' : 'approved'
              }
            : t
        ));
      } else {
        updateTaskStatus(task.id, 'completed');
      }
    } else {
      // If rejected, make task available again
      if (task.taskType === 'single' && task.assignedUserId === submission.userId) {
        unassignTask(task.id);
      }
      updateTaskStatus(task.id, 'approved');
    }
  };

  const assignTask = (taskId: string, userId: string, userName: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            assignedUserId: userId, 
            assignedUserName: userName,
            status: 'in_progress',
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  const unassignTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            assignedUserId: undefined, 
            assignedUserName: undefined,
            status: 'approved',
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  const addTransaction = (transactionData: Omit<WalletTransaction, 'id' | 'createdAt'>) => {
    const newTransaction: WalletTransaction = {
      ...transactionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const getUserBalance = (userId: string): number => {
    return userBalances[userId] || 0;
  };

  const updateUserBalance = (userId: string, amount: number) => {
    setUserBalances(prev => ({
      ...prev,
      [userId]: (prev[userId] || 0) + amount
    }));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      submissions,
      transactions,
      addTask,
      updateTaskStatus,
      submitTask,
      auditSubmission,
      assignTask,
      unassignTask,
      addTransaction,
      getUserBalance,
      updateUserBalance,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};