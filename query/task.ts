interface StartTimeProps {
  id: number;
  startTime: Date;
}

export async function fetchTasks() {
  const res = await fetch(`${process.env.BASE_URL}/task`);
  return res.json();
}
export async function startTask(data: { id: number; startTime: Date }) {
  const res = await fetch(`${process.env.BASE_URL}/task/taskTimer/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function stopTask(data: { id: number; endTime: Date }) {
  const res = await fetch(`${process.env.BASE_URL}/task/taskTimer/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
