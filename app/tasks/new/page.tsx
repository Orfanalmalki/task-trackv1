/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
interface taskForm {
  title: string;
  description: string;
}

const newTaskPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<taskForm>();
  console.log(register("title"));
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/tasks", data);
        router.push("/tasks");
      })}
    >
      <TextField.Root>
        <TextField.Input
          placeholder="Title"
          {...register("title")}
        ></TextField.Input>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
        )}
      />

      <Button>Create New Task</Button>
    </form>
  );
};

export default newTaskPage;
