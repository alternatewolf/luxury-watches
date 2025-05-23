import { ArrowRight } from "lucide-react";

const ButtonHover14 = () => {
  return (
    <>
      <button className="group cursor-pointer slide-anime px-5 py-3 rounded-full w-[180px] bg-white text-black border border-black flex justify-between items-center font-semibold ">
        Browse All
        <div className="group-hover:translate-x-2 transition-all">
          <ArrowRight />
        </div>
      </button>
    </>
  );
};

export default ButtonHover14;
