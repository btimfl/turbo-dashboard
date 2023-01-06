import { User } from '../interfaces';

const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

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
