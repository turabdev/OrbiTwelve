import Link from "next/link";
import type { BlogPost } from "@/types/blog";

export default function BlogFeatured({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-[2.5rem]"
    >
      <div className="absolute inset-0">
        <img
          src={post.cover}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="relative flex min-h-[420px] flex-col justify-end p-8 md:min-h-[520px] md:p-14">
        <div className="flex items-center gap-3 text-white/80">
          <span className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.14em]">
            {post.category}
          </span>
          <span className="text-xs">{post.readTime}</span>
        </div>
        <h2 className="mt-5 max-w-2xl text-balance text-3xl font-medium leading-[1.1] text-white md:text-5xl">
          {post.title}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}