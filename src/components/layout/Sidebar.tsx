import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  LayoutGrid,
  Plus,
  FileText,
  CheckCircle,
  Users,
  Settings,
  LogOut,
  Upload,
  Eye,
  Clipboard,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const uploaderLinks = [
  { to: '/uploader', icon: LayoutGrid, label: 'Dashboard' },
  { to: '/uploader/add-task', icon: Plus, label: 'Add Task' },
  { to: '/uploader/my-tasks', icon: FileText, label: 'My Tasks' },
  { to: '/uploader/audit', icon: Eye, label: 'Audit Tasks' },
  { to: '/uploader/completed', icon: CheckCircle, label: 'Completed' },
  { to: '/uploader/wallet', icon: Wallet, label: 'Wallet' },
];

const adminLinks = [
  { to: '/admin', icon: LayoutGrid, label: 'Dashboard' },
  { to: '/admin/pending', icon: Clipboard, label: 'Pending Approval' },
  { to: '/admin/approved', icon: CheckCircle, label: 'Approved Tasks' },
  { to: '/admin/users', icon: Users, label: 'Manage Users' },
];

const userLinks = [
  { to: '/user', icon: LayoutGrid, label: 'Dashboard' },
  { to: '/user/tasks', icon: FileText, label: 'Available Tasks' },
  { to: '/user/submissions', icon: Upload, label: 'My Submissions' },
  { to: '/user/completed', icon: CheckCircle, label: 'Completed' },
  { to: '/user/wallet', icon: Wallet, label: 'Wallet' },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const { getUserBalance } = useTask();

  if (!user) return null;

  const userBalance = getUserBalance(user.id);

  const getLinks = () => {
    switch (user.role) {
      case 'uploader':
        return uploaderLinks;
      case 'admin':
        return adminLinks;
      case 'user':
        return userLinks;
      default:
        return [];
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'uploader':
        return 'bg-blue-500';
      case 'admin':
        return 'bg-purple-500';
      case 'user':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", getRoleColor())}>
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">TaskFlow</h1>
            <p className="text-sm text-gray-500 capitalize">{user.role} Panel</p>
          </div>
        </div>
      </div>

      {/* Wallet Balance */}
      {user.role !== 'admin' && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Balance</span>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              ${userBalance}
            </Badge>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {getLinks().map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-500"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )
            }
          >
            <link.icon className="w-4 h-4" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <Separator />

      {/* User Profile */}
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}