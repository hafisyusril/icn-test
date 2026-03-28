/**
 * Task List Component
 */

'use client';

import { Task } from '@/types';
import { LoadingSpinner, EmptyState } from '@/components/ui';
import { IoListOutline } from 'react-icons/io5';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onToggleComplete?: (task: Task) => void;
  togglingTaskId?: string | null;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading = false,
  onEdit,
  onDelete,
  onToggleComplete,
  togglingTaskId
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<IoListOutline />}
        title="Tidak ada task"
        description="Mulai buat task baru untuk melacak pekerjaan Anda"
      />
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          isLoading={isLoading}
          togglingTaskId={togglingTaskId}
        />
      ))}
    </div>
  );
};

export default TaskList