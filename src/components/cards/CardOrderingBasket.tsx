
import Image from "next/image";

export default function CardOrderingBasket({ product, i }: any) {



  return (<>
    <div key={i} className="w-full  font-[Montserrat] flex justify-start gap-[10px] md:gap-[30px] pb-[20px] border-b-2">
      {/* <Link  href={`/carddetails/${encodeURIComponent(product.id)}`}> */}

        <div className="h-[88px]">
          {/* <img className="w-[100px]" src={product.img} alt="" /> */}

          <Image
            src={product.img}
            width={88}
            height={88}
            className="object-cover rounded-xl w-[88px] h-[88px]"
            priority={true}
            alt={product.img}
          />
        </div>
        <div className="">
          <div>
            <p className="text-[#1E2128] font-bold text-lg ">{product.price} сом</p>
            <p className="text-[#1E2128] font-semibold">{product.name}</p>
          </div>
          <p className="text-[#50535A] text-sm">
            Количество:
            <br />
            <span className="text-[#1E2128]">
              {product.quantity} ШТ.
            </span>
          </p>
        </div>

      {/* </Link> */}
    </div>
  </>
  );
}
