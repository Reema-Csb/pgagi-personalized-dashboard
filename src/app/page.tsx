import DashboardShell from "@/components/layout/DashboardShell";
import CategoryTabs from "@/components/dashboard/CategoryTabs";
import ContentGrid from "@/components/dashboard/ContentGrid";
import TrendingSection from "@/components/dashboard/TrendingSection";

export default function HomePage() {
  return (
    <DashboardShell>
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            Your personalized dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Good morning 👋
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            Discover news, recommendations, and social content based on your
            interests.
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Personalized for you</h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose the topics you want in your feed.
            </p>
          </div>

          <CategoryTabs />
        </div>

        <ContentGrid />

        <TrendingSection />
      </section>
    </DashboardShell>
  );
}
