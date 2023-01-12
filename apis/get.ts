const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

export async function getUserList(merchant: string): Promise<any> {
  const res = await fetch(`${baseUrl}/v1/users/${merchant}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
    },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
