import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import { InfoIcon, CheckIcon, TriangleIcon, LoaderCircle } from 'lucide-react';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      // className="toaster group"
      // icons={{
      //   success: <CheckIcon />,
      //   info: <InfoIcon />,
      //   warning: <TriangleIcon />,
      //   error: <TriangleIcon />,
      //   loading: <LoaderCircle className="animate-spin" />,
      // }}
      {...props}
    />
  );
};

export { Toaster };
