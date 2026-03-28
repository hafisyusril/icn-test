
import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Email harus valid')
    .required('Email tidak boleh kosong'),
  password: yup
    .string()
    .min(6, 'Password minimal 6 karakter')
    .required('Password tidak boleh kosong'),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .required('Nama tidak boleh kosong'),
  email: yup
    .string()
    .email('Email harus valid')
    .required('Email tidak boleh kosong'),
  password: yup
    .string()
    .min(6, 'Password minimal 6 karakter')
    .required('Password tidak boleh kosong'),
});

export const taskSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Judul minimal 3 karakter')
    .max(100, 'Judul maksimal 100 karakter')
    .required('Judul tidak boleh kosong'),
  description: yup
    .string()
    .max(500, 'Deskripsi maksimal 500 karakter')
    .optional(),
  isCompleted: yup.boolean().optional(),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
export type RegisterFormValues = yup.InferType<typeof registerSchema>;
export type TaskFormValues = yup.InferType<typeof taskSchema>;
