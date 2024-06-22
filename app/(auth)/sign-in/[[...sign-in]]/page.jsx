import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center">
      <SignIn signInUrl="/sign-in" />
    </div>
  );
}
