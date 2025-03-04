import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Briefcase,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'Job Applications',
      href: '/applications',
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        'flex flex-col border-r bg-card transition-all duration-300',
        open ? 'w-64' : 'w-[70px]',
      )}
    >
      <div className="flex h-14 items-center px-4 border-b">
        {open ? (
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="font-semibold">JobHunter</span>
          </div>
        ) : (
          <Briefcase className="h-6 w-6 mx-auto" />
        )}
      </div>
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="px-2 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    location.pathname === item.href
                      ? 'bg-accent text-blue-600 dark:text-blue-400'
                      : 'hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  {item.icon}
                  {open && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-full flex justify-center"
        >
          {open ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
