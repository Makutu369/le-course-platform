"use client";
import { Card, CardContent } from "@/components/ui/card";
import { accessCourse } from "@/lib/queries/queries";
import Image from "next/image";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useTransition } from "react";

// Update the interface to match the database schema
interface CourseCardProps {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  userId?: string | null;
}

export default function CourseCard({
  id,
  title,
  description,
  imageUrl,
  price,
  userId,
}: CourseCardProps) {
  const [isPending, startTransition] = useTransition();
  const formatPrice = (price: number) => `GHC${(price / 100).toFixed(2)}`;

  const handleAccess = () => {
    startTransition(async () => {
      await accessCourse({ courseId: id, userId: userId ?? "" });
    });
  };

  return (
    <Card
      className="group overflow-hidden hover:cursor-pointer transition-all duration-300 hover:border-primary/50 bg-card relative"
      onClick={handleAccess}
    >
      {isPending && (
        <div className="absolute inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg?height=480&width=640"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute top-3 right-3 size-8 bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ArrowUpRight className="h-4 w-4 text-primary" />
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors tracking-tight leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground/70 line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-border">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
            Education
          </span>
          {price ? (
            <span className="font-bold text-primary text-sm">{formatPrice(price)}</span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 rounded-full px-3 py-1 uppercase tracking-wider">
              Available
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
