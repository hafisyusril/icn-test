/**
 * Task Item Component
 */

"use client";

import { Task } from "@/types";
import { Card, CardBody, Checkbox, LoadingSpinner } from "@/components/ui";
import { IoTrash, IoPencil } from "react-icons/io5";

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onToggleComplete?: (task: Task) => void;
  isLoading?: boolean;
  togglingTaskId?: string | null;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  isLoading,
  togglingTaskId,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {task.id === togglingTaskId ? (
            <LoadingSpinner  />
          ) : (
            <Checkbox
              checked={task.isCompleted}
              onChange={() => onToggleComplete?.(task)}
              disabled={isLoading}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-gray-900 wrap-break-words ${
                task.isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              {new Date(task.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onEdit?.(task)}
            disabled={isLoading}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Edit task"
          >
            <IoPencil size={18} />
          </button>
          <button
            onClick={() => onDelete?.(task.id)}
            disabled={isLoading}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Hapus task"
          >
            <IoTrash size={18} />
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskItem;
