import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";
import BlogFeatured from "@/components/BlogFeatured";
import BlogCard from "@/components/BlogCard";
import { posts } from "@/app/lib/dummy-posts";

export default function Blog() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <TopNavBar />

      <section className="mt-20 px-4 pt-4">
        <div className="mx-auto max-w-360">
          <div className="mb-10 px-2 pt-6 md:px-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Journal
            </p>
            <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight md:text-6xl">
              Notes on design, code, and running a studio
            </h1>
          </div>

          <BlogFeatured post={featured} />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}