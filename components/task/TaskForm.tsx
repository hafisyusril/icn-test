/**
 * Task Form Component untuk Create/Edit Task
 */

'use client';

import { useFormik } from 'formik';
import { Task } from '@/types';
import { taskSchema, type TaskFormValues } from '@/lib/validation/schemas';
import { Button, Input, Textarea, Checkbox } from '@/components/ui';

interface TaskFormProps {
  initialValues?: Task;
  onSubmit: (values: TaskFormValues) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const formik = useFormik<TaskFormValues>({
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      isCompleted: initialValues?.isCompleted || false,
    },
    validationSchema: taskSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        label="Judul Task"
        type="text"
        placeholder="Masukkan judul task..."
        {...formik.getFieldProps('title')}
        error={formik.touched.title ? formik.errors.title : undefined}
      />

      <Textarea
        label="Deskripsi (Opsional)"
        placeholder="Masukkan deskripsi task..."
        rows={4}
        {...formik.getFieldProps('description')}
        error={formik.touched.description ? formik.errors.description : undefined}
      />

      <Checkbox
        label="Tandai sebagai Selesai"
        {...formik.getFieldProps('completed')}
        checked={formik.values.isCompleted}
      />

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {initialValues ? 'Update Task' : 'Buat Task'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Batal
        </Button>
      </div>
    </form>
  );
};

export default TaskForm
