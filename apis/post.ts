import { User } from '../interfaces';

const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

export async function login(payload: any): Promise<any> {
  const res = await fetch(`${baseUrl}/v1/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
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
    body: JSON.stringify(user),
  });
  if (res.status === 302) throw new Error('User already exists');
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
