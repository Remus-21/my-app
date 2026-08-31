'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { createUserAction, FormState } from '../../actions/user';

const initialState: FormState = {};

const NewUserpage = () => {
  const [state, formAction, isPending] = useActionState(createUserAction, initialState);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/users" className="btn btn-ghost btn-sm">
          ← Back to Users
        </Link>
        <h1 className="text-2xl font-bold">Create New User</h1>
      </div>

      <div className="card bg-base-100 shadow-md border border-base-200">
        <div className="card-body">
          {state?.errors?.general && (
            <div role="alert" className="alert alert-error mb-4">
              <span>{state.errors.general.join(', ')}</span>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Jane Doe"
                className={`input input-bordered w-full ${
                  state?.errors?.name ? 'input-error' : ''
                }`}
                required
              />
              {state?.errors?.name && (
                <label className="label">
                  <span className="label-text-alt text-error font-medium">
                    {state.errors.name.join(', ')}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. jane.doe@example.com"
                className={`input input-bordered w-full ${
                  state?.errors?.email ? 'input-error' : ''
                }`}
                required
              />
              {state?.errors?.email && (
                <label className="label">
                  <span className="label-text-alt text-error font-medium">
                    {state.errors.email.join(', ')}
                  </span>
                </label>
              )}
            </div>

            <div className="card-actions justify-end mt-6">
              <Link href="/users" className="btn btn-ghost">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending}
              >
                {isPending ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUserpage;

