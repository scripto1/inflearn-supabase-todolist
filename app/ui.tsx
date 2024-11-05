"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import Todo from "./components/todo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-actions";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");

  const todosQuery = useQuery({
    queryKey: ["todos", searchInput],
    queryFn: () => getTodos({ searchInput }),
  });

  const createToMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "New Todo",
        completed: false,
      }),

    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <section className="flex flex-col items-center  w-1/2 mx-auto py-10 gap-2">
      <h1 className="text-xl font-extrabold">TODO list</h1>
      <Input
        label="Search Todo"
        placeholder="Search Todo"
        icon={<i className="fas fa-search" />}
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      {todosQuery.isPending && <p>Loading...</p>}
      {todosQuery.data &&
        todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}

      <Button
        onClick={() => createToMutation.mutate()}
        loading={createToMutation.isPending}
      >
        <i className="fas fa-plus font-extrabold mr-2" />
        Add Todo
      </Button>
    </section>
  );
}
