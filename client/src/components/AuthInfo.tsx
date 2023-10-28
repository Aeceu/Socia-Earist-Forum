export default function AuthInfo() {
  return (
    <div className="w-full md:w-1/2 p-4  flex flex-col items-center ">
      <span className="hidden md:flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)]">
          EARIST
        </h1>
        <p className=" text-lg font-bold text-[rgb(177,1,1)] drop-shadow-[0px_1px_1px_rgba(250,204,21,.8)]">
          Eulogio Amang Rodriguez Institute of Science and Technology
        </p>
      </span>
      <img alt="bg-auth" src={"/bg-auth.png"} width={550} height={550} />
    </div>
  );
}
