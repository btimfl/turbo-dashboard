const baseUrl = 'http://localhost:4001';

export async function getUserList() {
    const headers = new Headers();
    const res = await fetch(`${baseUrl}/dashboard/users/get`, {
        headers
    });
    return res.json();
}