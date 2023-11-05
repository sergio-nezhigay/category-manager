import React from "react";

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
    <div>
      <h3>{title}</h3>
      {!isReadonly && (
        <>
          <span>
            <p>{isVisible ? "visible" : "invisible"}</p>
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => onToggle(id)}>Toggle visibility</button>
          </span>
          <div {...provided.dragHandleProps}>DRAG AREA</div>
        </>
      )}
    </div>
  );
}
