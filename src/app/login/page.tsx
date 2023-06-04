import LoginForm from "@/components/LoginForm";

export default function Login() {

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div>
        <h1>Login</h1>

        <LoginForm />
      </div>
    </div>
  );
}