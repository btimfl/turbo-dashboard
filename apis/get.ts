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

export async function fetchGraphData(
  tenant: string,
  from: string,
  to: string
): Promise<any> {
  const res = await fetch(
    `${baseUrl}/v1/graph?tenant=${tenant}&from=${from}&to=${to}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
      },
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

export async function getCsv(
  tenant: string,
  from: string,
  to: string
): Promise<any> {
  const res = await fetch(
    `${baseUrl}/v1/download/csv?tenant=${tenant}&from=${from}&to=${to}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
      },
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  return res.blob();
}
