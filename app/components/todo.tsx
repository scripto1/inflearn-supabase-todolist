"use client";

import { Checkbox, IconButton } from "@material-tailwind/react";
import { useState } from "react";

export default function Todo() {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div className="flex w-full items-center gap-2">
      <Checkbox
        checked={completed}
        onChange={(event) => setCompleted(event.target.checked)}
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
        <IconButton onClick={() => setIsEditing(false)}>
          <i className="fas fa-check" />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </IconButton>
      )}

      <IconButton>
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
