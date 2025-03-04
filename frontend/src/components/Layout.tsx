import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface LayoutProps {
  onLogout: () => void;
}

export default function Layout({ onLogout }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (location.pathname === '/applications/add') {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!localStorage.getItem('authToken') && location.pathname !== '/login') {
      console.log('Not logged in', location.pathname);
      navigate('login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          onLogout={onLogout}
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
