"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Home = () => {
  const [categories, setCategories] = useState([]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedCategories = [...categories];
    const [movedCategory] = updatedCategories.splice(result.source.index, 1);
    updatedCategories.splice(result.destination.index, 0, movedCategory);

    // Update the order of categories based on the new order
    updatedCategories.forEach((category, index) => {
      category.order = index;
    });

    setCategories(updatedCategories);
  };

  useEffect(() => {
    const sampleData = [
      { id: "category-1", title: "Category 1", order: 0 },
      { id: "category-2", title: "Category 2", order: 1 },
      { id: "category-3", title: "Category 3", order: 2 },
    ];
    setCategories(sampleData);
  }, []);

  const handleAddCategory = (values, { resetForm }) => {
    const newCategory = {
      id: `category-${categories.length + 1}`,
      title: values.title,
      order: categories.length, // Set the order to the end
    };
    setCategories([...categories, newCategory]);
    resetForm();
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
  };

  return (
    <div>
      <h1>Categories</h1>
      <Formik initialValues={{ title: "" }} onSubmit={handleAddCategory}>
        <Form>
          <Field type="text" name="title" placeholder="Category Title" />
          <button type="submit">Add Category</button>
        </Form>
      </Formik>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="category-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
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
                        className="category"
                      >
                        {category.title}
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Home;
