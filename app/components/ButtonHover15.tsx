import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ButtonHover15Props {
  href?: string;
  children?: React.ReactNode;
}

const ButtonHover15 = ({
  href = "/shop",
  children = "Check Out All Brands",
}: ButtonHover15Props) => {
  return (
    <Link href={href}>
      <button className="group cursor-pointer slide-anime px-5 py-3 rounded-full w-[280px] bg-white text-black border border-black flex justify-between items-center font-semibold ">
        {children}
        <div className="group-hover:translate-x-2 transition-all">
          <ArrowRight />
        </div>
      </button>
    </Link>
  );
};

export default ButtonHover15;
