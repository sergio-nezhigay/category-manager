import React from "react";
import ToggleButton from "./ToggleButton";

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
            <svg class="icon" width="26" height="26">
              <use href="/images/icons.svg#delete"></use>
            </svg>
          </button>
        </span>
      )}
      <div
        {...provided.dragHandleProps}
        className={isReadonly ? "h-0" : "w-[8px] h-[13px]"}
      >
        <svg class="icon" width="16" height={isReadonly ? "0" : "12"}>
          <use href="/images/icons.svg#drag"></use>
        </svg>
      </div>
    </>
  );
}
