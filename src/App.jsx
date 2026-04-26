import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Skeleton from './components/Skeleton';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Features = lazy(() => import('./pages/Features'));
const Contact = lazy(() => import('./pages/Contact'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        } />
        <Route path="about" element={
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        } />
        <Route path="features" element={
          <Suspense fallback={<Loading />}>
            <Features />
          </Suspense>
        } />
        <Route path="contact" element={
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        } />
        <Route path="login" element={
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        } />
        <Route path="signup" element={
          <Suspense fallback={<Loading />}>
            <SignupPage />
          </Suspense>
        } />
        <Route path="profile" element={
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
