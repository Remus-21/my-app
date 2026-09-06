import React from 'react';
import Link from 'next/link';

interface User {
  email: string;
  id: number;
  name: string;
}

interface Props {
  searchParams: Promise<{ sortOrder?: string }>;
}

// When you don'twant to store data in cache
// const Userspage = async () => {
//    const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
//    const users: User[] = await res.json();

// When getting fresh data every 10 seconds
const Userspage = async ({ searchParams }: Props) => {
  const { sortOrder } = await searchParams;
  const res = await fetch('http://localhost:3000/api/users', {
    next: { revalidate: 10 },
  });
  const users: User[] = await res.json();

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'email') {
      return a.email.localeCompare(b.email);
    }
    if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    }
    return a.id - b.id;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-sm text-base-content/70">
            Last revalidated: <span className="font-mono">{new Date().toLocaleTimeString()}</span> (ISR: 10s)
          </p>
        </div>
        <Link href="/users/new" className="btn btn-primary btn-sm">
          + New User
        </Link>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-sm border border-base-200">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>#</th>
              <th>
                <Link
                  href="/users?sortOrder=name"
                  className="hover:underline flex items-center gap-1 font-semibold"
                >
                  Name {sortOrder === 'name' ? '▲' : ''}
                </Link>
              </th>
              <th>
                <Link
                  href="/users?sortOrder=email"
                  className="hover:underline flex items-center gap-1 font-semibold"
                >
                  Email {sortOrder === 'email' ? '▲' : ''}
                </Link>
              </th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="hover">
                <td>{user.id}</td>
                <td className="font-medium">
                  <Link
                    href={`/users/${user.id}`}
                    className="link link-primary no-underline hover:underline font-semibold"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="text-base-content/80">{user.email}</td>
                <td className="text-right">
                  <Link
                    href={`/users/${user.id}`}
                    className="btn btn-ghost btn-xs text-primary"
                  >
                    View Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userspage;

