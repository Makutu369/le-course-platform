"use client";
import { Card, CardContent } from "@/components/ui/card";
import { accessCourse } from "@/lib/queries/queries";
import Image from "next/image";
import Link from "next/link";

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
  price = 0,
  userId,
}: CourseCardProps) {
  const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;

  return (
    <Card
      className="overflow-hidden w-60 h-60 transition-all duration-300 hover:shadow-lg"
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
        <Link href={`/courses/${id}`} className="block">
          <h3 className="font-bold text-lg line-clamp-2 mb-1 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {description}
          </p>
        )}
        <p className="text-sm text-muted-foreground mb-1">
          Love Economy Church
        </p>
        <div className="flex items-center gap-1 mb-1"></div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold">{formatPrice(price ?? 0)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
