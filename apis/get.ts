const baseUrl = "http://turbo-dev.unicommerce.co.in/merchant";

export async function getUserList() {
  const res = await fetch(`${baseUrl}/v1/getMerchantDetailsByName/Neemans`, {
    headers: {
      Cookie: "JSESSIONID=C1267510EE5F3AC10B6D00A9EADF7185",
    },
  });
  return res.json();
}
