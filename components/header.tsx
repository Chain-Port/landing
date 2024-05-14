"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, useAnimate } from "framer-motion";
import { useScroll } from "@/lib/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  const { scrolled } = useScroll();
  const [refLogo, animate] = useAnimate();
  const [refCTA] = useAnimate();

  React.useEffect(() => {
    animate(
      refLogo.current,
      {
        x: scrolled ? -35 : -100,
        opacity: scrolled ? 1 : 0,
      },
      { duration: 0.3 }
    );
    animate(
      refCTA.current,
      {
        x: scrolled ? 160 : 220,
        opacity: scrolled ? 1 : 0,
      },
      { duration: 0.3 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container relative flex h-16 items-center justify-between px-4 sm:px-8 ">
        <Link
          href="/"
          className={cn(
            "mr-8 flex items-center space-x-2 transition-all duration-300 hover:opacity-80",
            {
              "translate-x-[-10px] opacity-0": scrolled,
            }
          )}
          suppressHydrationWarning
        >
          <Image
            src={siteConfig.global.logo}
            alt={siteConfig.global.name}
            loading="lazy"
            width={20}
            height={20}
            // className="aspect-[auto 30 / 30] object-cover"
          />
          <span className="inline-block font-bold">
            {siteConfig.global.name}
          </span>
        </Link>
        <div
          className={cn(
            "absolute left-1/2 top-1/2 hidden translate-x-[-50%] translate-y-[-50%] rounded-full bg-gray-300/0 px-3 py-[6px] backdrop-blur-md transition-all duration-300 lg:block",
            {
              "bg-gray-300/50 shadow-md dark:bg-gray-800/70": scrolled,
            }
          )}
        >
          <div className="overflow-hidden">
            <div
              suppressHydrationWarning
              className={cn("relative transition-all duration-300", {
                "ml-[40px] mr-[160px]": scrolled,
              })}
            >
              <motion.div
                ref={refLogo}
                className="absolute"
                initial={{ x: -100, y: 4, opacity: 0 }}
                // className="top-1/2"
              >
                <Link href="/">
                  <Image
                    src={siteConfig.global.logo}
                    alt={siteConfig.global.name}
                    loading="lazy"
                    width={20}
                    height={20}
                    className="aspect-[auto 30 / 30] object-cover"
                  />
                </Link>
              </motion.div>
              <Nav items={siteConfig.header.nav.links} />
              <motion.div
                ref={refCTA}
                className="absolute right-0"
                initial={{ x: 0, y: -28, opacity: 0 }}
              >
                <Link href={siteConfig.header.cta.primary.href}>
                  <Button
                    size="sm"
                    color="primary"
                  >
                    {siteConfig.header.cta.primary.label}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div
          suppressHydrationWarning
          className={cn(
            "hidden space-x-2 transition-all duration-300 lg:flex ",
            {
              "translate-x-[10px] opacity-0": scrolled,
            }
          )}
        >
          <Link href={siteConfig.header.cta.primary.href}>
            <Button color="primary" size="sm">
              {siteConfig.header.cta.primary.label}
            </Button>
          </Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
};

interface NavItem {
  label: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

interface NavProps {
  items: NavItem[];
  direction?: "column" | "row";
  onNavItemClick?: () => void;
}

const Nav = (props: NavProps) => {
  const { items, direction = "row", onNavItemClick } = props;
  const pathname = usePathname();
  useSearchParams();

  return (
    <nav
      className={cn("flex items-center gap-0 sm:gap-2", {
        "flex-col gap-2": direction === "column",
      })}
    >
      {items?.map(
        (item, index) =>
          item.href && (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "hover:text-foreground w-full rounded-full px-4 py-1 text-center text-sm font-medium transition-all",
                item.disabled && "cursor-not-allowed opacity-80",
                item.href === pathname
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/60"
              )}
              onClick={onNavItemClick}
            >
              {item.label}
            </Link>
          )
      )}
    </nav>
  );
};

const MobileNav = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" color="neutral" size="icon">
            <MenuIcon />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className=" bg-card w-56 pt-12 ">
          <div className="flex flex-col space-y-8">
            <Link
              href="/"
              className="flex justify-center transition-all hover:opacity-80"
              onClick={handleClose}
            >
              <Image
                src={siteConfig.global.logo}
                alt={siteConfig.global.name}
                loading="lazy"
                width={30}
                height={30}
                className="aspect-[auto 30 / 30] object-cover"
              />
            </Link>
            <Nav
              items={siteConfig.header.nav.links}
              direction="column"
              onNavItemClick={handleClose}
            />
            <Link href={siteConfig.header.cta.primary.href}>
              <Button size="sm">{siteConfig.header.cta.primary.label}</Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
