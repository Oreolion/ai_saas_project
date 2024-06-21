"use client";

import EmptyStates from "@/components/EmptyStates";
import LoaderSpinner from "@/components/LoaderSpinner";
import Searchbar from "@/components/Searchbar";
import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const Discover = () => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search: ""
  });

  return (
    <div className="flex flex-col gap-9">
      <Searchbar></Searchbar>
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">Discover</h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              
        <div className="podcast_grid">
        {podcastsData?.map(
          ({ _id, imageUrl, podcastTitle, podcastDescription }) => {
            return (
              <PodcastCard
                key={_id}
                imgUrl={imageUrl!}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
              ></PodcastCard>
            );
          }
        )}
      </div>
            ) : (
              <EmptyStates title="No results found"></EmptyStates>
            )}
          </>
        ) : (
          <LoaderSpinner></LoaderSpinner>
        )}
      </div>
    </div>
  );
};

export default Discover;
