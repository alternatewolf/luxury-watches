import { ArrowRight } from "lucide-react";

const ButtonHover15 = () => {
  return (
    <>
      <button className="group cursor-pointer slide-anime px-5 py-3 rounded-full w-[280px] bg-white text-black border border-black flex justify-between items-center font-semibold ">
        Check Out All Brands
        <div className="group-hover:translate-x-2 transition-all">
          <ArrowRight />
        </div>
      </button>
    </>
  );
};

export default ButtonHover15;
