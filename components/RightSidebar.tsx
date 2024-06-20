"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const RightSidebar = () => {
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount)
  return (
    <section className="right_sidebar text-white-1">
      <SignedIn>
        <div className="flex justify-between">
          <Link className="flex gap-3 pb-12" href={`/profile/${user?.id}`}>
            <UserButton></UserButton>
            <div className="flex w-full item-center justify-between">
              <h1 className="text-16 truncate font-semibold text-white-1">
                {user?.firstName} {user?.lastName}
              </h1>
            </div>
          </Link>
          <h1>{user?.firstName}</h1>
          <Image
            src="/icons/right-arrow.svg"
            alt="arrow"
            width={24}
            height={24}
            className="mt-[-43px]"
          ></Image>
        </div>
      </SignedIn>

      <section>
        <Header headerTitle="Fans Like You"></Header>
        <Carousel fansLikeDetail={topPodcasters!}></Carousel>
      </section>
    </section>
  );
};

export default RightSidebar;
