# Todo Frontend

A modern React application for managing todos with user authentication, built with TypeScript, Zustand, React Query, and React Hook Form.

## Features

- User authentication (signup, login, logout)
- Password reset functionality
- Create, read, update, and delete todos
- Mark todos as completed/incomplete
- Real-time updates with React Query
- Form validation with Zod schemas
- Global state management with Zustand
- Type-safe API calls with TypeScript

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - Global state management
- **React Query** - Data fetching and caching
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **Axios** - HTTP client

## Prerequisites

- Node.js (v16 or higher)
- Backend API running on http://localhost:5000

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

The app will run on http://localhost:5173

## Project Structure

```
src/
├── hooks/
│   ├── useAuth.ts           # Authentication hooks
│   └── useTodos.ts          # Todo CRUD hooks
├── lib/
│   └── api.ts               # Axios instance with interceptors
├── pages/
│   ├── Login.tsx            # Login page
│   ├── Signup.tsx           # Signup page
│   ├── ForgotPassword.tsx   # Forgot password page
│   ├── ResetPassword.tsx    # Reset password page
│   └── Dashboard.tsx        # Main todo dashboard
├── schemas/
│   ├── auth.schema.ts       # Auth validation schemas
│   └── todo.schema.ts       # Todo validation schemas
├── store/
│   └── authStore.ts         # Zustand auth store
├── App.tsx                  # Main app component with routes
└── main.tsx                 # App entry point
```

## Features Breakdown

### Authentication
- **Signup**: Create a new account with name, email, and password
- **Login**: Sign in with email and password
- **Forgot Password**: Request a password reset email
- **Reset Password**: Set a new password using the reset token
- **Auto-logout**: Automatically logout on 401 errors

### Todo Management
- **Create**: Add new todos with a title
- **Read**: View all your todos in a list
- **Update**: Edit todo titles
- **Delete**: Remove todos
- **Toggle**: Mark todos as completed or incomplete

### State Management
- **Zustand**: Manages authentication state (user, token)
- **React Query**: Handles server state, caching, and automatic refetching
- **Persistent Storage**: Auth state persists in localStorage

### Form Handling
- **React Hook Form**: Efficient form state management
- **Zod Validation**: Type-safe schema validation
- **Error Display**: Real-time validation error messages

## Key Technologies Explained

### Zustand
Used for global state management. Stores user authentication data and persists it to localStorage.

### React Query
Handles all API calls with automatic caching, refetching, and error handling. Provides loading and error states out of the box.

### Zod
Validates form inputs and API responses. Ensures type safety and provides clear error messages.

### React Hook Form
Manages form state efficiently with minimal re-renders. Integrates with Zod for validation.

## API Integration

The app communicates with the backend API using Axios. All requests include:
- JWT token in Authorization header (for protected routes)
- Automatic token refresh handling
- Error interceptors for 401 responses

## Routing

- `/` - Dashboard (protected)
- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/forgot-password` - Forgot password page (public)
- `/reset-password/:token` - Reset password page (public)

Protected routes redirect to login if not authenticated.
Public routes redirect to dashboard if already authenticated.

## Styling

Basic inline styles are used for simplicity. You can easily replace them with:
- CSS Modules
- Styled Components
- Tailwind CSS
- Material-UI
- Chakra UI

## Testing the App

1. Start the backend server first
2. Start the frontend dev server
3. Open http://localhost:5173
4. Create an account or login
5. Add, edit, delete, and toggle todos

## Assumptions

- Backend API is running on http://localhost:5000
- All API responses follow the documented format
- JWT tokens are stored in localStorage
- Password reset emails are sent successfully
- Network requests may fail and are handled gracefully

## Future Enhancements

- Add todo descriptions
- Add due dates
- Add categories/tags
- Add search and filter
- Add dark mode
- Add animations
- Improve UI/UX design
- Add unit and integration tests

## License

MIT
