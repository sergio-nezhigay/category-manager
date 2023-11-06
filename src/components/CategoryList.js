import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CategoryItem from "@/components/CategoryItem";

export default function CategoryList({
  categories,
  handleDragEnd,
  onToggle,
  onDelete,
}) {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="category-list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-3"
          >
            {categories
              .sort((a, b) => a.order - b.order)
              .map((category, index) => (
                <Draggable
                  key={category.id}
                  draggableId={category.id}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex justify-between items-center gap-3 bg-[#24252E] border-2 border-[#323443] rounded h-[50px] px-5"
                    >
                      <CategoryItem
                        id={category.id}
                        title={category.title}
                        isReadonly={category.isReadonly}
                        isVisible={category.isVisible}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        provided={provided}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
