import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { TaskProvider } from '@/context/TaskContext';
import { Layout } from '@/components/layout/Layout';
import { Toaster } from '@/components/ui/toaster';

// Auth pages
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { VerifyOTP } from '@/pages/auth/VerifyOTP';
import { ResetPassword } from '@/pages/auth/ResetPassword';

// Uploader pages
import { UploaderDashboard } from '@/pages/uploader/Dashboard';
import { AddTask } from '@/pages/uploader/AddTask';
import { MyTasks } from '@/pages/uploader/MyTasks';
import { AuditTasks } from '@/pages/uploader/AuditTasks';
import { UploaderWallet } from '@/pages/uploader/Wallet';

// Admin pages
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { PendingTasks } from '@/pages/admin/PendingTasks';

// User pages
import { UserDashboard } from '@/pages/user/Dashboard';
import { AvailableTasks } from '@/pages/user/AvailableTasks';
import { UserWallet } from '@/pages/user/Wallet';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${user.role}`} replace />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to={`/${user.role}`} replace />} />
      <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to={`/${user.role}`} replace />} />
      <Route path="/verify-otp" element={!user ? <VerifyOTP /> : <Navigate to={`/${user.role}`} replace />} />
      <Route path="/reset-password" element={!user ? <ResetPassword /> : <Navigate to={`/${user.role}`} replace />} />

      {/* Protected routes */}
      <Route path="/" element={<Layout />}>
        {/* Default redirect based on user role */}
        <Route 
          index 
          element={
            user ? (
              <Navigate to={`/${user.role}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Uploader routes */}
        <Route 
          path="/uploader" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <UploaderDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/add-task" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <AddTask />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/my-tasks" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <MyTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/audit" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <AuditTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/completed" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <MyTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/wallet" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <UploaderWallet />
            </ProtectedRoute>
          } 
        />

        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/pending" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PendingTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/approved" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PendingTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* User routes */}
        <Route 
          path="/user" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/tasks" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <AvailableTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/submissions" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/completed" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/wallet" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserWallet />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <AppRoutes />
          <Toaster />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;