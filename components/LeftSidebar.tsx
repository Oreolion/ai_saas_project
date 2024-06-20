"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex cursor-pointer item-center gap-1 pb-10 max-lg:justify-center"
        >
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={23}
            height={27}
          ></Image>
          <h1 className="text-24 font-extrabold text-white max-lg:hidden">
            DoPodcast
          </h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn(
                "flex cursor-pointer item-center gap-1 pb-10 max-lg:justify-center",
                {
                  "bg-nav-focus border-r-4 border-orange-1": isActive,
                }
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              ></Image>
              <p>{item.label}</p>
            </Link>
          );
        })}
      </nav>

      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button asChild className="text-16 w-full bg-orange-1 font-extrabold">
            <Link href="sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            onClick={() => signOut(() => router.push("/"))}
            className="text-16 w-full bg-orange-1 font-extrabold"
          >
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
