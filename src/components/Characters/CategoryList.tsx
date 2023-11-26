/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState } from "react";

interface CategoryListProps {
  title: string;
}

const CategoryList: React.FC<CategoryListProps> = (
  props: CategoryListProps
) => {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`mx-[2px] h-8 w-auto max-w-[290px] rounded-md ${
        active ? "bg-white" : "bg-[#b49636]"
      } px-4 py-5 text-[14px] hover:bg-yellow-500  font-[500] text-black  `}
    >
      <p className="flex h-full items-center justify-center hover:text-black">
        {props.title}
      </p>
    </button>
  );
};

export default CategoryList;
