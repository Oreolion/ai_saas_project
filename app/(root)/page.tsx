"use client";
import PodcastCard from "@/components/PodcastCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <main className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

        <div className="podcast_grid">
          {trendingPodcasts?.map(
            ({ _id, imageUrl, podcastTitle, podcastDescription }) => {
              return (
                <PodcastCard
                  key={_id}
                  imgUrl={imageUrl}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                ></PodcastCard>
              );
            }
          )}
        </div>
      </section>
    </main>
  );
}
