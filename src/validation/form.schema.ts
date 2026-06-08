import { z } from 'zod';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine(
        (val) => val.charAt(0) === val.charAt(0).toUpperCase(),
        'First letter must be uppercase',
      ),

    age: z.coerce
      .number({ error: 'Age must be a number' })
      .int('Age must be a whole number')
      .min(0, 'Age cannot be negative'),

    email: z.string().superRefine((val, ctx) => {
      const parts = val.split('@');

      if (parts.length !== 2) {
        ctx.addIssue({ code: 'custom', message: 'Email must contain exactly one @' });

        return;
      }

      const [local, domain] = parts;

      if (!local) {
        ctx.addIssue({ code: 'custom', message: 'Local part cannot be empty' });
      }

      if (!domain || !domain.includes('.')) {
        ctx.addIssue({ code: 'custom', message: 'Domain must contain a dot' });
      }
    }),

    gender: z.enum(['male', 'female', 'other'] as const, {
      error: 'Gender is required',
    }),

    termsAccepted: z.literal(true, {
      error: 'You must accept the Terms & Conditions',
    }),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .refine((val) => /\d/.test(val), 'Must contain a number')
      .refine((val) => /[A-Z]/.test(val), 'Must contain an uppercase letter')
      .refine((val) => /[a-z]/.test(val), 'Must contain a lowercase letter')
      .refine((val) => /[^A-Za-z0-9]/.test(val), 'Must contain a special character'),

    confirmPassword: z.string(),

    country: z.string().min(1, 'Country is required'),

    image: z
      .custom<File>((val) => val instanceof File && val.size > 0, 'Image is required')
      .refine((file) => file.size <= MAX_IMAGE_SIZE, 'Image must be smaller than 2 MB')
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg and .png files are accepted',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

export type FormValues = z.infer<typeof formSchema>;
