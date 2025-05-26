import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ButtonHover14Props {
  href?: string;
  children?: React.ReactNode;
}

const ButtonHover14 = ({
  href = "/shop",
  children = "Browse All",
}: ButtonHover14Props) => {
  return (
    <Link href={href}>
      <button className="group cursor-pointer slide-anime px-5 py-3 rounded-full w-[180px] bg-white text-black border border-black flex justify-between items-center font-semibold ">
        {children}
        <div className="group-hover:translate-x-2 transition-all">
          <ArrowRight />
        </div>
      </button>
    </Link>
  );
};

export default ButtonHover14;
