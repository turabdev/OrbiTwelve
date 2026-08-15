import Link from "next/link";
import type { BlogPost } from "@/types/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={post.cover}
          alt=""
          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span>{post.category}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-foreground">
          {post.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{formattedDate}</p>
      </div>
    </Link>
  );
}