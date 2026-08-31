import fs from 'fs/promises';
import path from 'path';

interface User {
  id: number;
  name: string;
  email: string;
}

const dataDir = path.join(process.cwd(), '.data');
const usersFile = path.join(dataDir, 'users.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Read users from file
async function readUsers(): Promise<User[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

// Write users to file
async function writeUsers(users: User[]): Promise<void> {
  try {
    await ensureDataDir();
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users to file:', error);
    throw error;
  }
}

// Get next ID
async function getNextId(): Promise<number> {
  const users = await readUsers();
  if (users.length === 0) return 1;
  return Math.max(...users.map(u => u.id)) + 1;
}

export async function addUser(name: string, email: string): Promise<User> {
  console.log('addUser called with:', { name, email });
  
  const users = await readUsers();
  const nextId = await getNextId();
  
  const newUser: User = { id: nextId, name, email };
  users.push(newUser);
  
  await writeUsers(users);
  console.log('User saved to file:', newUser);
  
  return newUser;
}

export async function getAllUsers(): Promise<User[]> {
  const users = await readUsers();
  console.log('getAllUsers returning:', users);
  return users;
}

export async function getUserById(id: number): Promise<User | null> {
  const users = await readUsers();
  const user = users.find(u => u.id === id);
  console.log('getUserById:', id, 'found:', user);
  return user || null;
}

export async function resetUsers(): Promise<void> {
  await writeUsers([]);
}
