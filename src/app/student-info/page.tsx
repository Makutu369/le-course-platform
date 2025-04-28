export const dynamic = 'force-dynamic';

import ServerMegaCenters from "./ServerMegaCenter";
import StudentInfoForm from "./student-form";

export default function StudentInfoPage() {
  return (
    <ServerMegaCenters>
      {(megaCenters) => <StudentInfoForm megaCenters={megaCenters}  />}
    </ServerMegaCenters>
  );
}
