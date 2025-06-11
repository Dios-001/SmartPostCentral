"use client";

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = "/api/auth/login/x"; // Redirect to your auth route
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Sign in with Twitter
    </button>
  );
}
