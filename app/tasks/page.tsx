import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TasksPage = () => {
  return (
    <div>
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
    </div>
  );
};

export default TasksPage;
