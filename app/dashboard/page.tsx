"use client";

import { apiClient } from "@/lib/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import CreateTaskModal from "@/components/task/CreateTaskModal";
import DeleteConfirmationModal from "@/components/task/DeleteConfirmationModal";
import TaskList from "@/components/task/TaskList";
import { Button, ErrorAlert } from "@/components/ui";
import { TaskFormValues } from "@/lib/validation/schemas";
import { ApiResponse, Task } from "@/types";
import { IoAdd } from "react-icons/io5";

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [togglingTaskId, setTogglingTaskId] = useState<string | null>(null);

  // Get tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Task[]>>("/tasks/my-tasks");
      return res.data.data;
    },
  });

  // Create task
  const createTaskMutation = useMutation({
    mutationFn: (values: TaskFormValues) =>
      apiClient.post<Task>("/tasks", values).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task berhasil dibuat!");
      setIsCreateModalOpen(false);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal membuat task";
      toast.error(message);
    },
  });

  // Update task
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TaskFormValues }) =>
      apiClient.put<Task>(`/tasks/${id}`, payload).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task berhasil diperbarui!");
      setIsCreateModalOpen(false);
      setSelectedTask(null);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal memperbarui task";
      toast.error(message);
    },
  });

  // Delete task
  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task berhasil dihapus!");
      setIsDeleteModalOpen(false);
      setDeleteConfirmId(null);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal menghapus task";
      toast.error(message);
    },
  });

  // Handle Create Task
  const handleCreateTask = useCallback(
    (values: TaskFormValues) => {
      createTaskMutation.mutate(values);
    },
    [createTaskMutation],
  );

  // Handle Edit Task
  const handleEditTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsCreateModalOpen(true);
  }, []);

  // Handle Update Task
  const handleUpdateTask = useCallback(
    (values: TaskFormValues) => {
      if (!selectedTask) return;
      updateTaskMutation.mutate({
        id: selectedTask.id,
        payload: values,
      });
    },
    [selectedTask, updateTaskMutation],
  );

  // Handle Delete Task
  const handleDeleteTask = useCallback((taskId: string) => {
    setDeleteConfirmId(taskId);
    setIsDeleteModalOpen(true);
  }, []);

  // Handle Confirm Delete
  const handleConfirmDelete = useCallback(() => {
    if (!deleteConfirmId) return;
    deleteTaskMutation.mutate(deleteConfirmId);
  }, [deleteConfirmId, deleteTaskMutation]);

  // Handle Toggle Complete
  const handleToggleComplete = useCallback(
    (task: Task) => {
      setTogglingTaskId(task.id); // task yang sedang di-toggle
      updateTaskMutation.mutate(
        {
          id: task.id,
          payload: {
            title: task.title,
            description: task.description,
            isCompleted: !task.isCompleted,
          },
        },
        {
          onSettled: () => {
            setTogglingTaskId(null); // reset setelah selesai (success atau error)
          },
        },
      );
    },
    [updateTaskMutation],
  );

  // Handle Close Modal
  const handleCloseModal = useCallback(() => {
    setIsCreateModalOpen(false);
    setSelectedTask(null);
  }, []);

  return (
    <div>
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-gray-600 mt-1">
            Kelola semua task Anda di sini ({tasks.length} task)
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center gap-2"
          >
            <IoAdd size={20} />
            Buat Task
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <ErrorAlert
          title="Error"
          message={
            error instanceof Error
              ? error.message
              : "Gagal memuat task. Silakan coba lagi."
          }
        />
      )}

      {/* Task List */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          togglingTaskId={togglingTaskId}
        />
      </div>

      {/* Create/Edit Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
        editingTask={selectedTask || undefined}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeleteConfirmId(null);
        }}
        isLoading={deleteTaskMutation.isPending}
      />
    </div>
  );
}
