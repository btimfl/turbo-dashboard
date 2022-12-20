const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

export async function createUser(): Promise<Response> {
    const res = await fetch(`/user/v1/create/user`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('turbo-merchant')}`,
            'Cookie': 'JSESSIONID=C1267510EE5F3AC10B6D00A9EADF7185',
        }
    });
    return res;
}