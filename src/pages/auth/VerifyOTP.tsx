import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';

export function VerifyOTP() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const email = location.state?.email || '';

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        // Cooldown timer for resend
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple characters

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length && i < 6; i++) {
            if (/^\d$/.test(pastedData[i])) {
                newOtp[i] = pastedData[i];
            }
        }

        setOtp(newOtp);
        setError('');

        // Focus the next empty input or the last one
        const nextEmptyIndex = newOtp.findIndex(digit => !digit);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock OTP validation
            if (otpString !== '123456') {
                throw new Error('Invalid verification code. Please try again.');
            }

            // Navigate to reset password page
            navigate('/reset-password', { state: { email, verified: true } });

        } catch (err: any) {
            setError(err.message || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setResendCooldown(60); // 60 seconds cooldown
            setOtp(['', '', '', '', '', '']); // Clear current OTP
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    // Redirect if no email provided
    if (!email) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center py-12">
                        <p className="text-gray-600 mb-4">Invalid access. Please start from the forgot password page.</p>
                        <Link to="/forgot-password">
                            <Button>Go to Forgot Password</Button>
                        </Link>
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
                    <p className="text-gray-600">Verify your email</p>
                </div>

                {/* OTP Verification Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                            Enter Verification Code
                        </CardTitle>
                        <CardDescription>
                            We've sent a 6-digit code to <span className="font-medium text-blue-600">{email}</span>
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-4">
                                <div className="flex justify-center space-x-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={loading}
                                        />
                                    ))}
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Didn't receive the code?
                                    </p>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleResendOTP}
                                        disabled={resendLoading || resendCooldown > 0}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        {resendLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-1"></div>
                                                Sending...
                                            </>
                                        ) : resendCooldown > 0 ? (
                                            `Resend in ${resendCooldown}s`
                                        ) : (
                                            <>
                                                <RefreshCw className="w-3 h-3 mr-1" />
                                                Resend Code
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={loading || otp.join('').length !== 6}>
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Verifying...
                                    </>
                                ) : (
                                    'Verify Code'
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Back to Forgot Password */}
                <div className="text-center">
                    <Link
                        to="/forgot-password"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
}