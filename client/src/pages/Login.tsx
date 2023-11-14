import AuthInfo from "../components/AuthInfo";
import LoginForm from "../components/LoginForm";

export default function page() {
  return (
    <div className="relative min-h-screen flex ">
      <AuthInfo />
      <div
        className="w-full md:w-1/2 md:justify-center flex flex-col gap-8  items-center p-4
       bg-[url(/bg.jpg)] md:bg-none md:bg-[#fff] bg-no-repeat  bg-cover 
       "
      >
        <img
          src="/uni.jpg"
          className="flex md:hidden opacity-10 w-full h-full absolute"
        />
        <span className="flex gap-1 md:gap-2 items-center md:items-end">
          <img
            src="/comsa.jpg"
            width={70}
            height={70}
            className="rounded-full object-cover border-2 border-black"
          />
          <span className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl text-yellow-400 font-bold drop-shadow-[3px_3px_0px_rgba(177,1,1,1)]">
              EARIST
            </h1>
            <p className="pb-4 text-sm md:text-lg  md:text-[rgb(177,1,1)] md:drop-shadow-[3px_3px_0px_rgba(250,204,21,.8)] text-yellow-400 font-bold drop-shadow-[3px_3px_0px_rgba(177,1,1,.8)]">
              Eulogio Amang Rodriguez Institute of Science and Technology
            </p>
          </span>
          <img
            src="/cas.png"
            width={70}
            height={70}
            className="rounded-full object-cover "
          />
        </span>
        <LoginForm />
      </div>
    </div>
  );
}
