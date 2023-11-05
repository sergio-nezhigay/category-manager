"use client";
import React, { useState, useEffect } from "react";
import { useMemo } from "react";

import CustomConfirm from "@/components/CustomConfirm";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./custom-confirm-dialog.css";
import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import CreateCategoryForm from "@/components/CreateCategoryForm";
import CategoryList from "@/components/CategoryList";
const LOGOIMG = "/images/logo.png";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredCategories = useMemo(
    () =>
      categories.filter(({ title }) =>
        title.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, categories]
  );

  const showDeleteConfirmation = (categoryId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomConfirm
            onClose={onClose}
            onConfirm={() => {
              handleDeleteCategory(categoryId);
            }}
          />
        );
      },
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
        "api/categories/reorder",
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

  const handleAddCategory = (values) => {
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
    <>
      <header className="border border-transparent border-b-[#313442]">
        <div className="container h-[76px] flex justify-between items-center gap-3  ">
          <div className="shrink">
            <Image
              src={LOGOIMG}
              width={196}
              height={30}
              alt="Logo"
              priority
              className="shrink"
            />
          </div>

          <SearchForm onSubmit={setFilter} />
        </div>
      </header>

      <CreateCategoryForm onSubmit={handleAddCategory} />
      <CategoryList
        categories={filteredCategories}
        handleDragEnd={handleDragEnd}
        onToggleClick={showToggleConfirmation}
        onDeleteClick={showDeleteConfirmation}
      />
    </>
  );
};

export default Home;
