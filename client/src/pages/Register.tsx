import SignUpForm from "../components/SignUpForm";
import AuthInfo from "../components/AuthInfo";
export default function page() {
  return (
    <div className="min-h-screen flex items-center bg-[url(/bg.jpg)] bg-no-repeat bg-center bg-cover">
      <AuthInfo />
      <div className="absolute md:relative w-full p-4  md:w-1/2 flex flex-col items-center justify-center">
        <SignUpForm />
      </div>
    </div>
  );
}
