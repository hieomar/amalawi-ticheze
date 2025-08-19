const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

export async function requestOTP(email: string) {
  const response = await fetch(`${backendUrl}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send OTP");
  }

  return data;
}

export async function verifyOTP(email: string, otp: string) {
  const response = await fetch(`${backendUrl}/api/auth/verify-otp`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Invalid OTP");
  }

  return data;
}
