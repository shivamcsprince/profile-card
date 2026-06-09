const BASE_URL = process.env.REACT_APP_API_URL || "/api";

const handleResponse = async (res) => {
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "API error");
  }
  return json.data;
};

export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/profile`);
  return handleResponse(res);
};

export const updateProfile = async (data) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};
