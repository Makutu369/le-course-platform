import { terminateSession } from "@/lib/session";

const SignOut = () => {
  return (
    <div
      onClick={terminateSession}
      className="px-2 py-2 mt-1 text-sm  rounded-md hover:cursor-pointer "
    >
      Sign out
    </div>
  );
};

export default SignOut;
