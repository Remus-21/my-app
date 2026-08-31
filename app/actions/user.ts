'use server';	

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addUser } from '../lib/userStore';

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
    console.log('Creating user:', { name, email });
    const result = await addUser(name, email);
    console.log('User created successfully:', result);
  } catch (error) {
    console.error('User creation error:', error);
    return {
      errors: { general: ['Error occurred while creating user.'] },
    };
  }

  console.log('Revalidating path and redirecting to /users');
  revalidatePath('/users');
  redirect('/users');
}
