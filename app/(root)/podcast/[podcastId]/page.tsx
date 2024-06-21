"use client";

import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import EmptyStates from "@/components/EmptyStates";
import LoaderSpinner from "@/components/LoaderSpinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import PodcastCard from "@/components/PodcastCard";
import { useUser } from "@clerk/nextjs";

const PodcastDetails = ({
  params: { podcastId },
}: {
  params: { podcastId: Id<"podcasts"> };
}) => {


    const {user} = useUser()

  const podcast = useQuery(api.podcasts.getPodcastById, {
    podcastId,
  });


  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
    podcastId,
  });

  const isOwner = user?.id === podcast?.authorId;

  if (!similarPodcasts || !podcast) return <LoaderSpinner></LoaderSpinner>;

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          ></Image>
          <h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>
      <PodcastDetailPlayer isOwner={isOwner} 
      podcastid={podcast._id}
      {...podcast}
      ></PodcastDetailPlayer>
      <p className="text-16 pb-8 pt-[45px] font-medium text-white-2 max-md:text-center">
        {podcast?.podcastDescription}
      </p>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.voicePrompt}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.imagePrompt}
          </p>
        </div>
      </div>

      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts?.map(
              ({ _id, imageUrl, podcastTitle, podcastDescription }) => {
                return (
                  <PodcastCard
                    key={_id}
                    imgUrl={imageUrl}
                    title={podcastTitle}
                    description={podcastDescription}
                    podcastId={_id}
                  ></PodcastCard>
                )    
              }
            )}
          </div>
        ) : (
            <>
            <EmptyStates
            title="No Similar Podcast Found"
            buttonLink="/discover"
            buttonText="Discover more podcasts"
            ></EmptyStates>
            </>
          )}
      </section>
    </section>
  );
};

export default PodcastDetails;
