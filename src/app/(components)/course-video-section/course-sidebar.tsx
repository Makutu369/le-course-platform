import { cn } from "@/lib/utils";
import { Lock, Play } from "lucide-react";

interface courseSidebarProps {
  course: course;
  currentSectionId?: string;
  courseId: string;
}

type course = {
  completed: boolean | null;
  sectionId: string;
  section: Section;
}[];

interface Section {
  id: string;
  title: string;
  videoUrl: string;
}
export async function CourseSidebar(props: courseSidebarProps) {
  return (
    <div className="lg:w-[40%] w-full b  overflow-hidden transition-all duration-300">
      <div className="p-4 border-b ">
        <h3 className="font-semibold text-slate-800">Course Content</h3>
        <p className="text-sm text-slate-500">
          {/* {completedVideos.length} of {videos.length} completed */}
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {props.course.map((sections) => {
          const currentSection = sections.sectionId === props.currentSectionId;
          return (
            <div
              key={sections.sectionId}
              className={cn(
                "p-3 flex items-start gap-3 transition-colors cursor-pointer"
              )}
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium gap-x-3 flex items-center text-sm text-muted-foreground line-clamp-2 ">
                  {sections.completed && !currentSection && (
                    <Lock className="bg-destructive" />
                  )}
                  {currentSection && <Play />}
                  {sections.section.title}
                </h4>
                {/* <p className="text-xs text-slate-500">{section.}</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
