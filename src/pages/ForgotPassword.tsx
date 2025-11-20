import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, ForgotPasswordInput } from '../schemas/auth.schema';
import { useForgotPassword } from '../hooks/useAuth';
import { useState } from 'react';

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: forgotPassword, isPending, error } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword(data, {
      onSuccess: () => {
        setSuccess(true);
      },
    });
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Check Your Email</h2>
            <p>We've sent you a password reset link</p>
          </div>
          
          <div className="success-alert">
            Please check your email inbox for the password reset link. The link will expire in 10 minutes.
          </div>

          <Link to="/login" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Forgot Password?</h2>
          <p>Enter your email to receive a reset link</p>
        </div>
        
        {error && (
          <div className="error-alert">
            {(error as any)?.response?.data?.message || 'Failed to send reset email. Please try again.'}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              {...register('email')}
              type="email"
              className="form-input"
              placeholder="john@example.com"
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
