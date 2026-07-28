import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUsers } from "@/lib/storage";
import LoginPicker from "@/components/LoginPicker";

export default function LoginPage() {
  const user = getCurrentUser();
  if (user) redirect("/");

  const users = getUsers();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <LoginPicker users={users} />
    </div>
  );
}
