const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

export async function getUserList() {
  const res = await fetch(`${baseUrl}/v1/users/DELHI`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
    },
  });
  return res.json();
}
