import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { resetPasswordSchema, ResetPasswordInput } from '../schemas/auth.schema';
import { useResetPassword } from '../hooks/useAuth';

export default function ResetPassword() {
  const { resetToken } = useParams<{ resetToken: string }>();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending, error } = useResetPassword(resetToken!);

  const onSubmit = (data: ResetPasswordInput) => {
    resetPassword(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Reset Password</h2>
          <p>Enter your new password</p>
        </div>
        
        {error && (
          <div className="error-alert">
            {(error as any)?.response?.data?.message || 'Failed to reset password. The link may have expired.'}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              {...register('password')}
              type="password"
              className="form-input"
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              {...register('confirmPassword')}
              type="password"
              className="form-input"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
