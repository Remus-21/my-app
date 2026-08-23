import React from 'react'

interface User {
  email: string;
  id: number;
  name: string;
}
// When you don'twant to store data in cache
// const Userspage = async () => {
//    const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
//    const users: User[] = await res.json();
// When getting fresh data every 10 seconds
const Userspage = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 10 } });
   const users: User[] = await res.json();
   


   return (
     <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <table className='table table-bordered'>
        <thead>
            <tr>
                <td>Name</td>
                <td>Email</td>
            </tr>
        </thead>
        <tbody>
             {users.map((user) => (
          <tr key={user.id}>
            <th>{user.name}</th>
            <th>{user.email}</th>
          </tr>
        ))}
        </tbody>
       
      </table>
     </> 
      
    
)
}

export default Userspage
