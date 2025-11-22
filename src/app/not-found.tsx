import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
    return(
    <div className=" h-[100vh] flex items-center justify-center container shadow-none md:shadow-[0_0_10px_0_#00000014] ">
      <div className="">
            <Image
              src="/images/404.svg"
              width={550}
              height={140}
              className="relative "
              alt="error"
            />
            <Link href="/"
            className="absolute right-0 left-0 bottom-[-100px] flex justify-center w-[100%]  ">
            <button className="h-[60px] m-auto px-[60px] bg-black rounded-[10px]">
               <p className="text-lg text-white ">Вернуться на главную</p>
            </button>
            </Link>
        </div>

    </div>
    )
  }