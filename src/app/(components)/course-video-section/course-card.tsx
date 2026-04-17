"use client";
import { Card, CardContent } from "@/components/ui/card";
import { accessCourse } from "@/lib/queries/queries";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
  const formatPrice = (price: number) => `GHC${(price / 100).toFixed(2)}`;

  return (
    <Card
      className="group overflow-hidden hover:cursor-pointer transition-all duration-300 hover:border-primary/50 bg-card"
      onClick={() => accessCourse({ courseId: id, userId: userId ?? "" })}
    >
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
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 uppercase tracking-wider">
              Free Access
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
