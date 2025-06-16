import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Lock, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';

export function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || '';
    const verified = location.state?.verified || false;

    const passwordStrength = {
        hasLength: formData.password.length >= 8,
        hasUpper: /[A-Z]/.test(formData.password),
        hasLower: /[a-z]/.test(formData.password),
        hasNumber: /\d/.test(formData.password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    };

    const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isPasswordStrong) {
            setError('Please ensure your password meets all requirements');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess(true);

            // Navigate to login after showing success message
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err: any) {
            setError(err.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Redirect if not verified
    if (!email || !verified) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center py-12">
                        <p className="text-gray-600 mb-4">Invalid access. Please complete email verification first.</p>
                        <Link to="/forgot-password">
                            <Button>Start Password Reset</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Password Reset Successful!</h2>
                        <p className="text-gray-600 mb-4">
                            Your password has been updated successfully.
                        </p>
                        <p className="text-sm text-gray-500">
                            Redirecting to login page...
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">TaskFlow</h1>
                    </div>
                    <p className="text-gray-600">Create new password</p>
                </div>

                {/* Reset Password Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Reset Password</CardTitle>
                        <CardDescription>
                            Create a new password for <span className="font-medium text-blue-600">{email}</span>
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                                    <div className="space-y-1">
                                        {[
                                            { key: 'hasLength', text: 'At least 8 characters' },
                                            { key: 'hasUpper', text: 'One uppercase letter' },
                                            { key: 'hasLower', text: 'One lowercase letter' },
                                            { key: 'hasNumber', text: 'One number' },
                                            { key: 'hasSpecial', text: 'One special character' },
                                        ].map(({ key, text }) => (
                                            <div key={key} className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${passwordStrength[key as keyof typeof passwordStrength]
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-300'
                                                    }`} />
                                                <span className={`text-xs ${passwordStrength[key as keyof typeof passwordStrength]
                                                    ? 'text-green-600'
                                                    : 'text-gray-500'
                                                    }`}>
                                                    {text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm new password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="text-xs text-red-500">Passwords do not match</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading || !isPasswordStrong || formData.password !== formData.confirmPassword}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Updating Password...
                                    </>
                                ) : (
                                    <>
                                        Update Password
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Back to Login */}
                <div className="text-center">
                    <Link
                        to="/login"
                        className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        Remember your password? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}