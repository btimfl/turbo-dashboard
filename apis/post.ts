import { User } from '../interfaces';

const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

export async function login(username: string, password: string): Promise<any> {
  const res = await fetch(`${baseUrl}/v1/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function createUser(user: User): Promise<any> {
  const res = await fetch(`${baseUrl}/v1/create/user`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
    },
    body: JSON.stringify({
      userName: 'XYZ2',
      password: 'XYZ1',
      credentialType: 'password',
      email: 'XYZ1@gmail.com',
      fullName: 'XYZ1',
      enabled: true,
      joinedGroupName: ['XYZ'],
      temporaryPassword: false,
      userRole: ['admin'],
      attribute: {
        locale: ['en'],
      },
    }),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
