import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider } from '@/components/theme-provider';

// import Login from '@/pages/Login';
// import Register from '@/pages/Register';
// import Dashboard from '@/pages/Dashboard';
// import JobApplications from '@/pages/JobApplications';
// import Profile from '@/pages/Profile';
// import Layout from '@/components/Layout';
// import AddApplication from '@/pages/AddApplication';
import { authClient } from '@/lib/auth-client';
import { Toaster } from '@/components/ui/sonner';
import { lazy } from 'react';

// Default pages
const Home = lazy(() => import('@/pages/(default)/page'));
const About = lazy(() => import('@/pages/(default)/about/page'));
const Customers = lazy(() => import('@/pages/(default)/customers/page'));
const Pricing = lazy(() => import('@/pages/(default)/pricing/page'));
const ChangeLogs = lazy(() => import('@/pages/(default)/changelog/page'));
import Layout from '@/pages/(default)/layout';

// Panel pages
const Panel = lazy(() => import('@/pages/(panel)/page'));
const Analyze = lazy(() => import('@/pages/(panel)/analyze/page'));
const Applications = lazy(() => import('@/pages/(panel)/applications/page'));
const Profile = lazy(() => import('@/pages/(panel)/profile/page'));

// Auth pages
const SignIn = lazy(() => import('@/pages/(auth)/signin/page'));
const SignUp = lazy(() => import('@/pages/(auth)/signup/page'));
const ResetPassword = lazy(() => import('@/pages/(auth)/reset-password/page'));
import AuthLayout from '@/pages/(auth)/layout';

function App() {
  // const { data: userData, error, isPending } = authClient.useSession();
  //
  // if (isPending) {
  //   return (
  //     <div className="w-screen flex min-h-screen items-center justify-center bg-background p-4">
  //       <div>Loading...</div>
  //     </div>
  //   );
  // }
  //
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  const handleLogin = () => {};

  const handleLogout = () => {
    authClient.signOut();
    localStorage.removeItem('authToken');
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            // element={userData ? <Navigate to="/" replace /> : <AuthLayout />}
            element={<AuthLayout />}
          >
            <Route path="signin" element={<SignIn onLogin={handleLogin} />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>
          <Route
            path="/"
            element={
              // userData ? (
              <Layout />
              // ) : (
              //   <Navigate to="/login" replace />
              // )
            }
          >
            <Route index element={<Home />} />
            <Route path="analyze" element={<Analyze />} />
            <Route path="about" element={<About />} />
            <Route path="customers" element={<Customers />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="changelog" element={<ChangeLogs />} />
            {/*<Route path="dashboard" element={<Dashboard />} />*/}
            {/*<Route path="applications" element={<JobApplications />} />*/}
            {/*<Route path="profile" element={<Profile />} />*/}
            {/*<Route path="applications/add" element={<AddApplication />} />*/}
          </Route>
          <Route
            path="/panel"
            element={
              // userData ? (
              <Layout />
              // ) : (
              //   <Navigate to="/login" replace />
              // )
            }
          >
            <Route index element={<Panel />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/add" element={<Applications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;
