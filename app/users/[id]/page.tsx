import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
interface UserDetail {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

 interface Props {
  params: Promise<{ id: string }>;
}

const UserDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
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
              <p className="text-sm text-base-content/70">@{user.username}</p>
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
                <p>
                  <span className="font-semibold text-base-content/70">Phone:</span>{' '}
                  <span>{user.phone}</span>
                </p>
                <p>
                  <span className="font-semibold text-base-content/70">Website:</span>{' '}
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    {user.website}
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-primary">Company</h2>
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-base-content">{user.company?.name || 'N/A'}</p>
                <p className="italic text-base-content/70">
                  {user.company?.catchPhrase ? `"${user.company.catchPhrase}"` : ''}
                </p>
                <p className="text-xs text-base-content/60">{user.company?.bs || ''}</p>
              </div>
            </div>

            <div className="space-y-3 md:col-span-2 border-t border-base-200 pt-4">
              <h2 className="text-lg font-semibold text-primary">Address</h2>
              <p className="text-sm text-base-content/80">
                {user.address ? `${user.address.suite}, ${user.address.street}, ${user.address.city} (${user.address.zipcode})` : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;