import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { loginSchema, LoginInput } from '../schemas/auth.schema';
import { useLogin } from '../hooks/useAuth';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending, error } = useLogin();

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to access your todos</p>
        </div>

        {error && (
          <div className="error-alert">
            {(error as any)?.response?.data?.message || 'Login failed. Please check your credentials.'}
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
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

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
