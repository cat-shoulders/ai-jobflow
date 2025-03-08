import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Building,
  Edit,
  Mail,
  MapPin,
  Phone,
  Plus,
  User,
} from 'lucide-react';
import { toast } from 'sonner';

const profileSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters' }),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Senior software developer with 8+ years of experience in full-stack development. Passionate about creating user-friendly applications and solving complex problems.',
    },
  });

  const onSubmit = (_data: ProfileFormValues) => {
    // In a real app, you would save this data to your backend
    toast('Profile updated');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="resume">Resume Files</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Your personal and contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" {...register('fullName')} />
                      {errors.fullName && (
                        <p className="text-sm text-destructive">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register('email')} />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" {...register('phone')} />
                      {errors.phone && (
                        <p className="text-sm text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" {...register('location')} />
                      {errors.location && (
                        <p className="text-sm text-destructive">
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" {...register('bio')} />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Profile"
                        />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Alex Johnson</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">alex.johnson@example.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">(555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">San Francisco, CA</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Bio</h3>
                      <p className="text-sm text-muted-foreground">
                        Senior software developer with 8+ years of experience in
                        full-stack development. Passionate about creating
                        user-friendly applications and solving complex problems.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Your professional experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Senior Developer</h3>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2022 - Present
                    </span>
                  </div>
                  <p className="text-sm">TechCorp Inc.</p>
                  <p className="text-xs text-muted-foreground">
                    Led development of multiple web applications using React,
                    Node.js, and AWS. Managed a team of 5 developers and implemented
                    CI/CD pipelines.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Full Stack Developer</h3>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2019 - 2022
                    </span>
                  </div>
                  <p className="text-sm">Innovate Solutions</p>
                  <p className="text-xs text-muted-foreground">
                    Developed and maintained multiple client projects using React,
                    TypeScript, and Node.js. Implemented responsive designs and
                    optimized application performance.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Frontend Developer</h3>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2017 - 2019
                    </span>
                  </div>
                  <p className="text-sm">WebFront</p>
                  <p className="text-xs text-muted-foreground">
                    Created responsive web interfaces using HTML, CSS, and
                    JavaScript. Collaborated with designers to implement UI/UX
                    improvements.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Your technical and professional skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Programming Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">JavaScript</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">Java</Badge>
                      <Badge variant="secondary">SQL</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Vue</Badge>
                      <Badge variant="secondary">HTML/CSS</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge>
                      <Badge variant="secondary">Redux</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">Express</Badge>
                      <Badge variant="secondary">Django</Badge>
                      <Badge variant="secondary">Spring Boot</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Databases</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">MongoDB</Badge>
                      <Badge variant="secondary">PostgreSQL</Badge>
                      <Badge variant="secondary">MySQL</Badge>
                      <Badge variant="secondary">Redis</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">DevOps</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Docker</Badge>
                      <Badge variant="secondary">Kubernetes</Badge>
                      <Badge variant="secondary">AWS</Badge>
                      <Badge variant="secondary">CI/CD</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Team Leadership</Badge>
                      <Badge variant="secondary">Communication</Badge>
                      <Badge variant="secondary">Problem Solving</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skills
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resume">
          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
              <CardDescription>Manage your resume and cover letters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Alex_Johnson_Resume.pdf</h3>
                    <p className="text-sm text-muted-foreground">
                      Updated 2 weeks ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    Replace
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">General_Cover_Letter.pdf</h3>
                    <p className="text-sm text-muted-foreground">
                      Updated 1 month ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    Replace
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">TechCorp_Cover_Letter.pdf</h3>
                    <p className="text-sm text-muted-foreground">
                      Updated 2 days ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    Replace
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
