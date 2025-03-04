import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Badge,
} from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  MoreHorizontal,
  Plus,
  Search,
  XCircle
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

// Sample data
const applications = [
  {
    id: '1',
    company: 'TechCorp Inc.',
    position: 'Senior Developer',
    date: '2025-04-15',
    status: 'interview',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
  },
  {
    id: '2',
    company: 'Innovate Solutions',
    position: 'Product Manager',
    date: '2025-04-14',
    status: 'applied',
    location: 'Remote',
    salary: '$110,000 - $130,000',
  },
  {
    id: '3',
    company: 'DesignHub',
    position: 'UX Designer',
    date: '2025-04-12',
    status: 'rejected',
    location: 'New York, NY',
    salary: '$90,000 - $110,000',
  },
  {
    id: '4',
    company: 'DataSystems',
    position: 'Data Scientist',
    date: '2025-04-10',
    status: 'offer',
    location: 'Boston, MA',
    salary: '$130,000 - $160,000',
  },
  {
    id: '5',
    company: 'WebFront',
    position: 'Frontend Developer',
    date: '2025-04-08',
    status: 'applied',
    location: 'Austin, TX',
    salary: '$95,000 - $120,000',
  },
  {
    id: '6',
    company: 'CloudTech',
    position: 'DevOps Engineer',
    date: '2025-04-05',
    status: 'interview',
    location: 'Seattle, WA',
    salary: '$125,000 - $145,000',
  },
  {
    id: '7',
    company: 'MobileSoft',
    position: 'Mobile Developer',
    date: '2025-04-03',
    status: 'rejected',
    location: 'Chicago, IL',
    salary: '$100,000 - $130,000',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'applied':
      return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Applied</Badge>;
    case 'interview':
      return <Badge variant="outline" className="flex items-center gap-1 text-blue-500 border-blue-500"><Clock className="h-3 w-3" /> Interview</Badge>;
    case 'offer':
      return <Badge variant="outline" className="flex items-center gap-1 text-green-500 border-green-500"><CheckCircle className="h-3 w-3" /> Offer</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="flex items-center gap-1 text-red-500 border-red-500"><XCircle className="h-3 w-3" /> Rejected</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function JobApplications() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredApplications = applications.filter(app =>
    app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground">
            Manage and track your job applications
          </p>
        </div>
        <Button onClick={() => navigate('/applications/add')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Application
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Applied</DropdownMenuItem>
            <DropdownMenuItem>Interview</DropdownMenuItem>
            <DropdownMenuItem>Offer</DropdownMenuItem>
            <DropdownMenuItem>Rejected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Oldest</DropdownMenuItem>
            <DropdownMenuItem>Company (A-Z)</DropdownMenuItem>
            <DropdownMenuItem>Position (A-Z)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Salary Range</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No applications found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                  <TableCell>{app.location}</TableCell>
                  <TableCell>{app.salary}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
