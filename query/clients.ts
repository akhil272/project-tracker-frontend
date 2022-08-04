export async function fetchClients() {
  const res = await fetch(`${process.env.BASE_URL}/client`);
  return res.json();
}
export async function fetchClientById(id: number) {
  const res = await fetch(`${process.env.BASE_URL}/client/${id}`);
  return res.json();
}

export async function createClient(data = {}) {
  const res = await fetch(`${process.env.BASE_URL}/client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
