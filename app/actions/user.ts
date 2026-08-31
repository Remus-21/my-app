'use server';	

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface FormState {
  errors?: {
    name?: string[];
    email?: string[];
    general?: string[];
  };
  message?: string;
}

export async function createUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';

  const errors: { name?: string[]; email?: string[] } = {};

  if (!name || name.length < 3) {
    errors.name = ['Name must be at least 3 characters long.'];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ['Please provide a valid email address.'];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) {
      return {
        errors: { general: ['Failed to create user. Please try again.'] },
      };
    }
  } catch {
    return {
      errors: { general: ['Network error occurred while creating user.'] },
    };
  }

  revalidatePath('/users');
  redirect('/users');
}
