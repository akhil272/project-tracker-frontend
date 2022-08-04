export async function fetchProcess() {
  const res = await fetch(`${process.env.BASE_URL}/process`);
  return res.json();
}
