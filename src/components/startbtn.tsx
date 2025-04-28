import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const StartButton = ({isAdded}: {isAdded:boolean}) => {

  return (
    <Link href={isAdded ? "/courses": "/student-info"}>
      <Button size="lg" className="w-full sm:w-auto">
        Start Now
      </Button>
    </Link>
  );
};

export default StartButton;
