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
    <ScrollArea className="lg:w-[30%] h-auto relative border border-border shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 border-b bg-muted sticky top-0 left-0">
        <h3 className="font-semibold text-foreground text-lg">
          Course Content
        </h3>
        <div className="text-sm text-muted-foreground mt-1 flex items-center">
          <span className="font-medium">{completedSections}</span>
          <span className="mx-1">/</span>
          <span>{totalSections}</span>
          <span className="ml-1">sections completed</span>
          <div className="ml-2 h-1.5 bg-slate-200 rounded-full w-24 overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{
                width: `${
                  totalSections > 0
                    ? (completedSections / totalSections) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {course && course.length > 0 ? (
        <div className="divide-y divide-border max-h-[calc(100vh-150px)]">
          {course.map((section, index) => {
            const isCurrentSection = section.sectionId === currentSectionId;
            const isCompleted = section.completed;

            return (
              <div
                key={section.sectionId}
                className={cn(
                  "p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-muted",
                  isCurrentSection && "bg-primary-foreground pl-3"
                )}
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : isCurrentSection ? (
                    <Button
                      size="icon"
                      variant="default"
                      className="size-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Play className="h-3 w-3 text-white ml-0.5" />
                    </Button>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs font-medium text-slate-500">
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
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {section.section?.title || "Untitled Section"}
                    </h4>
                    {!isCompleted && !isCurrentSection && (
                      <Lock className="h-4 w-4 text-slate-400 shrink-0 ml-2 mt-0.5" />
                    )}
                  </div>

                  <div className="flex items-center mt-1 text-xs text-slate-500">
                    <span className="mx-1.5">•</span>
                    <span>Video</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 text-center text-slate-500">
          <p>No course content available</p>
        </div>
      )}
    </ScrollArea>
  );
}
