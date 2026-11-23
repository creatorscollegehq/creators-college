"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { useAccessStatus } from "@/lib/useAccessStatus";

interface EnrollLinkProps {
  className?: string;
  enrollContent: ReactNode;
  enrolledContent?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
}

/**
 * Purchase CTA that turns into "Go to my course" for students who already have
 * lifetime access. Before the status request resolves it renders the normal
 * enroll copy, so the marketing page stays instant and SEO-friendly.
 */
export default function EnrollLink({
  className,
  enrollContent,
  enrolledContent,
  onClick,
  href = "/checkout",
}: EnrollLinkProps) {
  const { enrolled } = useAccessStatus();

  return (
    <Link
      prefetch={false}
      href={enrolled ? "/learn" : href}
      onClick={onClick}
      className={className}
    >
      {enrolled ? enrolledContent ?? "Go to My Course" : enrollContent}
    </Link>
  );
}
