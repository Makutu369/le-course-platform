import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, Play } from "lucide-react";

interface CourseSidebarProps {
  course?: {
    completed: boolean | null;
    sectionId: string;
    section: {
      id: string;
      title: string;
      videoUrl: string;
    };
  }[];
  currentSectionId?: string;
  courseId: string;
}

export function CourseSidebar({
  course = [],
  currentSectionId,
}: CourseSidebarProps) {
  const totalSections = course?.length || 0;
  const completedSections =
    course?.filter((section) => section.completed)?.length || 0;

  return (
    <ScrollArea className="lg:w-[30%] h-full relative border-2 border-border overflow-hidden">
      <div className="p-5 border-b-2 border-border bg-muted sticky top-0 left-0 z-10">
        <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
          Course Content
        </h3>
        <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
          <span className="font-bold text-foreground">{completedSections}</span>
          <span>/</span>
          <span>{totalSections}</span>
          <span>completed</span>
          <div className="ml-auto h-1.5 bg-muted-foreground/10 w-20 overflow-hidden">
            <div
              className="h-full bg-emerald-500"
              style={{
                width: `${totalSections > 0
                    ? (completedSections / totalSections) * 100
                    : 0
                  }%`,
              }}
            />
          </div>
        </div>
      </div>

      {course && course.length > 0 ? (
        <div className="divide-y-2 divide-border max-h-[calc(100vh-150px)]">
          {course.map((section, index) => {
            const isCurrentSection = section.sectionId === currentSectionId;
            const isCompleted = section.completed;

            return (
              <div
                key={section.sectionId}
                className={cn(
                  "p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-muted",
                  isCurrentSection && "bg-accent border-l-2 border-l-primary"
                )}
              >
                <div className="flex items-center justify-center h-7 w-7 shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  ) : isCurrentSection ? (
                    <Button
                      size="icon"
                      variant="default"
                      className="size-7 bg-primary flex items-center justify-center"
                    >
                      <Play className="h-3 w-3 text-white ml-0.5" />
                    </Button>
                  ) : (
                    <div className="h-7 w-7 border-2 border-border flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {index + 1}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4
                      className={cn(
                        "font-medium text-sm line-clamp-2",
                        isCurrentSection
                          ? "text-primary font-bold"
                          : "text-muted-foreground"
                      )}
                    >
                      {section.section?.title || "Untitled Section"}
                    </h4>
                    {!isCompleted && !isCurrentSection && (
                      <Lock className="h-4 w-4 text-muted-foreground/40 shrink-0 ml-2 mt-0.5" />
                    )}
                  </div>

                  <div className="flex items-center mt-1 text-[10px] text-muted-foreground/60 uppercase tracking-wider font-semibold">
                    <span>Video</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 text-center text-muted-foreground">
          <p>No course content available</p>
        </div>
      )}
    </ScrollArea>
  );
}
