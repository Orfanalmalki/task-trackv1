"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const newTaskPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title"></TextField.Input>
      </TextField.Root>
      <TextArea placeholder="Description"></TextArea>
      <Button>Create New Task</Button>
    </div>
  );
};

export default newTaskPage;
