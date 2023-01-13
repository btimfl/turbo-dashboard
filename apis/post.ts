import { Chart, ChartWorkflow } from '../enums';
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
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function fetchGraphData(
  tenant: string,
  widgetCode: Chart,
  workflow: ChartWorkflow | null,
  from: string,
  to: string
): Promise<any> {
  const res = await fetch(`${baseUrl}/v1/lookup`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('turbo-merchant')}`,
    },
    body: JSON.stringify({
      tenant: 'sugar',
      widgetCode,
      workflow,
      from: '2020-09-23',
      to: '2023-01-07',
    }),
  });

  if (!res.ok) throw new Error(res.statusText);
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}
