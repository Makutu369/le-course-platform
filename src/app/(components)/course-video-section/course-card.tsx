"use client";
import { Card, CardContent } from "@/components/ui/card";
import { accessCourse } from "@/lib/queries/queries";
import Image from "next/image";

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
      className="overflow-hidden hover:cursor-pointer sm:size-80 transition-all duration-300 hover:shadow-lg"
      onClick={() => accessCourse({ courseId: id, userId: userId ?? "" })}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg?height=480&width=640"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>
      <CardContent className="p-4">
        <div>
          <h3 className="font-bold text-lg line-clamp-2 mb-1 ">{title}</h3>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {description}
          </p>
        )}
        <p className="text-sm text-muted-foreground mb-1">
          Love Economy Church
        </p>
        <div className="flex items-center gap-1 mb-1"></div>
        {price && (
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold">{formatPrice(price ?? 0)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
