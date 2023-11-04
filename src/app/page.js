"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./custom-confirm-dialog.css";

const Home = () => {
  const [categories, setCategories] = useState([]);

  const showDeleteConfirmation = (categoryId) => {
    confirmAlert({
      buttons: [
        {
          label: "Save changes",
          className: "save",
          onClick: () => handleDeleteCategory(categoryId),
        },
        {
          label: "Cancel",
          className: "cancel",
          onClick: () => {},
        },
      ],
    });
  };

  const showToggleConfirmation = (categoryId) => {
    confirmAlert({
      buttons: [
        {
          label: "Save changes",
          className: "save",
          onClick: () => handleToggleVisibility(categoryId),
        },
        {
          label: "Cancel",
          className: "cancel",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("api/categories");
      const data = await res.data;
      setCategories(data);
    }
    fetchData();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedCategories = [...categories];
    const [movedCategory] = updatedCategories.splice(result.source.index, 1);
    updatedCategories.splice(result.destination.index, 0, movedCategory);

    updatedCategories.forEach((category, index) => {
      category.order = index;
    });

    axios
      .put(
        "api/categories",
        updatedCategories.map((category) => category.id)
      )
      .then((response) => {
        const updatedCategoriesFromServer = response.data.updatedCategories;
        setCategories(updatedCategoriesFromServer);
      })
      .catch((error) => {
        console.error("Error updating category order:", error);
      });
  };

  const handleAddCategory = (values, { resetForm }) => {
    axios
      .post("api/categories", {
        title: values.title,
        isVisible: false,
        isReadonly: false,
      })
      .then((response) => {
        const { newCategory } = response.data;
        setCategories([...categories, newCategory]);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
    resetForm();
  };

  const handleDeleteCategory = (categoryId) => {
    axios
      .delete(`api/categories?id=${categoryId}`)
      .then(() => {
        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleToggleVisibility = (categoryId) => {
    axios
      .patch(`api/categories?id=${categoryId}`)
      .then((response) => {
        console.log("🚀 ~ file: page.js:79 ~ response:", response.data);
        const { updatedCategory } = response.data;
        const updatedCategories = categories.map((category) => {
          return category.id === updatedCategory.id
            ? updatedCategory
            : category;
        });
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div>
      <h1>Categories</h1>
      <Formik initialValues={{ title: "" }} onSubmit={handleAddCategory}>
        <Form className="bg-slate-50">
          <Field type="text" name="title" placeholder="Category Title" />
          <button type="submit">Add Category</button>
        </Form>
      </Formik>
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
                        <h3>{category.title}</h3>

                        {!category.isReadonly && (
                          <>
                            <span>
                              <p>
                                {category.isVisible ? "visible" : "invisible"}
                              </p>
                              <button
                                onClick={() =>
                                  showDeleteConfirmation(category.id)
                                }
                              >
                                Delete
                              </button>
                              <button
                                onClick={() =>
                                  showToggleConfirmation(category.id)
                                }
                              >
                                Toggle visibility
                              </button>
                            </span>

                            <div {...provided.dragHandleProps}>DRAG AREA</div>
                          </>
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Home;
