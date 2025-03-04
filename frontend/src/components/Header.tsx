import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Briefcase, ChevronRight, Menu, Moon, Sun, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function Header({
  onLogout,
  onToggleSidebar,
  sidebarOpen,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbs = location.pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center">
        <Button
          onClick={() => {
            navigate('/');
          }}
          size="sm"
          variant="link"
          className="flex items-center gap-2"
        >
          <Briefcase className="h-5 w-5" />
          <span className="font-semibold">JH</span>
        </Button>
        {breadcrumbs.map((breadcrumb, index) => (
          <>
            <ChevronRight className="h-4 w-4" />
            <Button
              onClick={() => {
                if (index === breadcrumbs.length - 1) {
                  return;
                }
                navigate(breadcrumbs.slice(0, index + 1).join('/'));
              }}
              size="sm"
              variant="link"
              key={index}
            >
              {breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1)}
            </Button>
          </>
        ))}
      </div>

      {!sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
