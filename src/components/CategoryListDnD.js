import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CategoryListDnD = ({ categories, onDragEnd, onEdit }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="category-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {categories
              .sort((a, b) => a.order - b.order) // Sort categories by order
              .map((category, index) => (
                <Draggable
                  key={category.id}
                  draggableId={category.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => onEdit(category)}
                    >
                      {category.name}
                    </div>
                  )}
                </Draggable>
              ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CategoryListDnD;
