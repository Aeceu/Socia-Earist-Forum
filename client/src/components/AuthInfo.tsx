export default function AuthInfo() {
  return (
    <div className="relative h-screen w-1/2  hidden md:flex flex-col items-center justify-center bg-[url(/bg.jpg)] bg-no-repeat bg-center bg-cover">
      <img
        alt="bg-auth"
        src={"/uni.jpg"}
        className="absolute w-full h-full opacity-20"
      />
      <img src="/earist-logo.png" alt="logo" className="w-[500px] opacity-70" />
    </div>
  );
}
