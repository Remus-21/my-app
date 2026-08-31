import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
interface UserDetail {
  id: number;
  name: string;
  email: string;
}

 interface Props {
  params: Promise<{ id: string }>;
}

const UserDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    notFound();
  }

  const user: UserDetail = await res.json();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/users" className="btn btn-outline btn-sm">
          Back to Users
        </Link>
        <span className="badge badge-primary badge-outline font-semibold">
          User #{user.id}
        </span>
      </div>

      <div className="card bg-base-100 shadow-md border border-base-200">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-base-200 pb-4">
            <div>
              <h1 className="card-title text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-base-content/70">ID: {user.id}</p>
            </div>
            <a
              href={`mailto:${user.email}`}
              className="btn btn-primary btn-sm w-fit"
            >
              Contact User
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-primary">Contact Info</h2>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-semibold text-base-content/70">Email:</span>{' '}
                  <span className="font-mono">{user.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;