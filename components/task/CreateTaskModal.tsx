
'use client';

import { Modal } from '@/components/ui';
import { Task } from '@/types';
import { TaskFormValues } from '@/lib/validation/schemas';
import TaskForm from './TaskForm';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
  isLoading?: boolean;
  editingTask?: Task;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  editingTask,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTask ? 'Edit Task' : 'Buat Task Baru'}
      size="md"
    >
      <TaskForm
        initialValues={editingTask}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        isLoading={isLoading}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default CreateTaskModal