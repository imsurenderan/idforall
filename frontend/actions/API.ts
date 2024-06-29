const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addIdentity = async (id, data) => {
  const response = await fetch(`${API_URL}/identity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, data }),
  });
  return response.json();
};

export const getIdentity = async (id) => {
  const response = await fetch(`${API_URL}/identity/${id}`);
  return response.json();
};
