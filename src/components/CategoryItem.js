import React from "react";
import ToggleButton from "./ToggleButton";
import Image from "next/image";

const DELETEIMG = "/images/delete.svg";
const DRAGIMG = "/images/drag.svg";

export default function CategoryItem({
  id,
  title,
  isReadonly,
  isVisible,
  onDelete,
  onToggle,
  provided,
}) {
  return (
    <>
      <h3 className="text-sm font-medium text-overflow-ellipsis line-clamp-2">
        {title}
      </h3>
      {!isReadonly && (
        <span className="ml-auto flex justify-center items-center gap-2 md:gap-5 shrink-0">
          <ToggleButton onToggle={() => onToggle(id)} isVisible={isVisible} />

          <button onClick={() => onDelete(id)}>
            <Image src={DELETEIMG} alt="Delete" width={26} height={26} />
          </button>
        </span>
      )}
      <div
        {...provided.dragHandleProps}
        className={isReadonly ? "w-0 h-0" : "w-[8px] h-[13px]"}
      >
        <Image
          src={DRAGIMG}
          alt="Drag"
          width={0}
          height={0}
          className="w-full h-auto"
        />
      </div>
    </>
  );
}
