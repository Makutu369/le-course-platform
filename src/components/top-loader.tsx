"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TopLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // When the path or search params change, we stop the "loading" progress
        setLoading(false);
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (
                anchor &&
                anchor.href &&
                anchor.href.startsWith(window.location.origin) &&
                !anchor.href.includes("#") &&
                anchor.target !== "_blank"
            ) {
                // If it's an internal link, start the loader
                // Note: This is a bit of a heuristic as we can't easily intercept Next.js Link's internal state
                // but it improves the "responsive" feel of the click.
                if (anchor.href !== window.location.href) {
                    setLoading(true);
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);
        return () => document.removeEventListener("click", handleAnchorClick);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1">
            <div className="h-full bg-primary animate-progress-bar origin-left" />
            <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(0.9); }
        }
        .animate-progress-bar {
          animation: progress 2s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
