"use client";

import { Button, Input } from "@material-tailwind/react";
import Todo from "./components/todo";

export default function UI() {
  return (
    <section className="flex flex-col items-center  w-1/2 mx-auto py-10 gap-2">
      <h1 className="text-xl font-extrabold">TODO list</h1>
      <Input
        label="Search Todo"
        placeholder="Search Todo"
        icon={<i className="fas fa-search" />}
      />
      <Todo />

      <Button>
        <i className="fas fa-plus font-extrabold mr-2" />
        Add Todo
      </Button>
    </section>
  );
}
