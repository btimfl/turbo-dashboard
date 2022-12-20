const baseUrl = 'http://turbo-dev.unicommerce.co.in/merchant';

export async function getUserList(): Promise<Response> {
    const res = await fetch(`${baseUrl}/user/v1/getAllUsers/boat`, {
        headers: {
            'Cookie': 'JSESSIONID=C1267510EE5F3AC10B6D00A9EADF7185',
        }
    });
    return res;
}