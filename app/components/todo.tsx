"use client";

import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "actions/todo-actions";
import { queryClient } from "app/config/ReactQueryClientProvider";
import { useState } from "react";

export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const updateTodoMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        id: todo.id,
        title,
        completed,
      }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return (
    <div className="flex w-full items-center gap-2">
      {/* @ts-ignore */}
      <Checkbox
        checked={completed}
        onChange={async (event) => {
          await setCompleted(event.target.checked);
          await updateTodoMutation.mutate();
        }}
      />
      {isEditing ? (
        <input
          className="flex-1 border-b-black border-b"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed && "line-through"}`}>{title}</p>
      )}
      {isEditing ? (
        // @ts-ignore
        <IconButton onClick={async () => await updateTodoMutation.mutate()}>
          {updateTodoMutation.isPending ? (
            // @ts-ignore
            <Spinner />
          ) : (
            <i className="fas fa-check" />
          )}
        </IconButton>
      ) : (
        // @ts-ignore
        <IconButton onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </IconButton>
      )}
      {/* @ts-ignore */}
      <IconButton onClick={() => deleteTodoMutation.mutate()}>
        {deleteTodoMutation.isPending ? (
          // @ts-ignore
          <Spinner />
        ) : (
          <i className="fas fa-trash" />
        )}
      </IconButton>
    </div>
  );
}
