import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CategoryItem from "@/components/CategoryItem";

export default function CategoryList({
  categories,
  handleDragEnd,
  onToggleClick,
  onDeleteClick,
}) {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="category-list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
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
                      className="category"
                    >
                      <CategoryItem
                        id={category.id}
                        title={category.title}
                        isReadonly={category.isReadonly}
                        isVisible={category.isVisible}
                        onToggle={onToggleClick}
                        onDelete={onDeleteClick}
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
