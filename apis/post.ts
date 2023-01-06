import { User } from '../interfaces';

const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

export async function login(
  username: string,
  password: string
): Promise<Response> {
  const res = await fetch(`${baseUrl}/v1/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return res;
}

export async function createUser(user: User): Promise<Response> {
  const res = await fetch(`${baseUrl}/v1/create/user`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
    },
    body: JSON.stringify(user),
  });
  return res;
}
