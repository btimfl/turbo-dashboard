const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

export async function getUserList(): Promise<any> {
  const res = await fetch(`${baseUrl}/v1/users/DELHI`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
    },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
