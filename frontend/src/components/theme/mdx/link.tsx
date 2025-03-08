interface PostLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function PostLink({ href, ...props }: PostLinkProps) {
  return (
    <a href={href} {...props}>
      {props.children}
    </a>
  );
}
