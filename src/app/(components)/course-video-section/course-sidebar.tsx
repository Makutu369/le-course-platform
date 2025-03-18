import { cn } from "@/lib/utils";
import { CourseSections } from "@/db/schema";

interface courseSidebarProps {
  sections: CourseSections[];
  courseId: string;
}
export async function CourseSidebar(props: courseSidebarProps) {
  // const userSections = await getUsersCourseSections({
  //   courseId: props.courseId,
  // });

  return (
    <div className="w-[40%] bg-white shadow-sm rounded-xl overflow-hidden border border-slate-100 transition-all duration-300">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800">Course Content</h3>
        <p className="text-sm text-slate-500">
          {/* {completedVideos.length} of {videos.length} completed */}
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {props.sections.map((section) => {
          return (
            <div
              key={section.id}
              className={cn(
                "p-3 flex items-start gap-3 transition-colors cursor-pointer"
              )}
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 text-slate-700">
                  {section.title}
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
