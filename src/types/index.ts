export interface User {
  id: string;
  email: string;
  name: string;
  role: 'uploader' | 'admin' | 'user';
  avatar?: string;
  walletBalance: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  uploaderId: string;
  uploaderName: string;
  status: 'pending' | 'approved' | 'in_progress' | 'submitted' | 'auditing' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  requirements?: string[];
  tags?: string[];
  taskType: 'single' | 'multiple'; // New field for task assignment type
  assignedUserId?: string; // For single-person tasks
  assignedUserName?: string; // For single-person tasks
  maxCompletions?: number; // For multiple-person tasks
  currentCompletions?: number; // For multiple-person tasks
  isEscrowHeld: boolean; // Whether payment is held in escrow
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  submissionText?: string;
  screenshotUrl?: string;
  submittedAt: string;
  status: 'submitted' | 'approved' | 'rejected';
  auditNotes?: string;
  rewardAmount: number; // Amount to be paid for this submission
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'earning' | 'escrow_hold' | 'escrow_release';
  amount: number;
  description: string;
  taskId?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'uploader' | 'user') => Promise<void>;
  logout: () => void;
  loading: boolean;
}