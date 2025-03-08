interface PostImageProps {
  alt: string;
  caption?: string;
  size?: string;
  src: string;
}

export default function PostImage({ alt, caption, size, ...props }: PostImageProps) {
  const classes = size === 'lg' ? 'lg:-ml-32 lg:-mr-32' : '';

  return (
    <figure className={classes}>
      <img className="w-full" {...props} alt={alt} />
      {caption && (
        <figcaption className="text-sm text-center text-gray-500 mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
