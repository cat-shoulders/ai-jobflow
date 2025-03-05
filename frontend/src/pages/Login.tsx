import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Briefcase, Github } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_URL } from '@/conf.ts';
import { Separator } from '@/components/ui/separator.tsx';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginProps {
  onLogin: () => void;
}

const { signIn } = authClient;

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      console.log('Logged in', localStorage.getItem('authToken'));
      onLogin();
    }
  }, [onLogin]);

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    signIn.email({
      email,
      password,
      fetchOptions: {
        onResponse: () => {
          setIsLoading(false);
        },
        onRequest: () => {
          setIsLoading(true);
        },
        onError: (ctx) => {
          toast(ctx.error.message);
        },
        onSuccess: async (data) => {
          console.log('Logged in', data);
          localStorage.setItem('authToken', data.data.token);
          localStorage.setItem('userEmail', email);
          toast('Login successful');
          onLogin();
        },
      },
    });
  };

  const handleLoginGithub = async () => {
    const data = await signIn.social({
      provider: 'github',
    });
  };

  return (
    <div className="w-screen flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Briefcase className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-bold">JobHunter</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/*<Button variant="link" className="h-auto p-0 text-sm">*/}
                {/*  Forgot password?*/}
                {/*</Button>*/}
              </div>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <Separator className="my-5" />

            <div className="flex items-center gap-2">
              <Button
                className="bg-black hover:bg-black/80 text-white"
                type="button"
                onClick={handleLoginGithub}
                variant="default"
              >
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button
                type="button"
                onClick={() => {
                  navigate('/register');
                }}
                variant="link"
                className="h-auto p-0"
              >
                Sign up
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
