"use client"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
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
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn("flex cursor-pointer item-center gap-1 pb-10 max-lg:justify-center", {
                "bg-nav-focus border-r-4 border-orange-1": isActive
              })}
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
    </section>
  );
};

export default LeftSidebar;
