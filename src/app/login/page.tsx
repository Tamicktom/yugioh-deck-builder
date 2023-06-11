import LoginForm from "@/components/LoginForm";

export default function Login() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
      <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg bg-neutral-800">
        <h1>Login</h1>

        <LoginForm />
      </div>
    </div>
  );
}