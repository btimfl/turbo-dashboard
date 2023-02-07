const baseUrl = 'https://turbo.unicommerce.com/merchant';

export async function updateUser(email: string, payload: any): Promise<any> {
  const res = await fetch(`${baseUrl}/v1/update/${email}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
