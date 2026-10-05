import { ResponsiveImage } from "@/components/ui/responsive-image";

export function CoverImage({
  src,
  mobileSrc,
  alt,
  title,
  sizes = "(max-width: 1024px) 100vw, 60vw",
  className = "",
  imageClassName = "",
  priority = false,
  loading,
}: {
  src: string;
  mobileSrc?: string;
  alt: string;
  title?: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ResponsiveImage
        src={src}
        mobileSrc={mobileSrc}
        alt={alt}
        title={title}
        sizes={sizes}
        priority={priority}
        loading={loading}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
