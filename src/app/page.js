"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import axios from "axios";
import SearchForm from "@/components/SearchForm";
import CreateCategoryForm from "@/components/CreateCategoryForm";
import CategoryList from "@/components/CategoryList";
import { confirmAndRun, confirmAndRunCustom } from "@/utils/confirm";

import "react-confirm-alert/src/react-confirm-alert.css";
import "../styles/custom-confirm-dialog.css";

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

  const onDelete = (categoryId) => {
    confirmAndRunCustom(handleDeleteCategory, categoryId);
  };

  const onToggleVisibility = (categoryId) => {
    confirmAndRun(handleToggleVisibility, categoryId);
  };

  const onAddCategory = (values) => {
    confirmAndRun(handleAddCategory, values);
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
      <header className="fixed w-full border border-transparent border-b-[#313442]">
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
      <main>
        <section className="pt-[116px]">
          <div className="w-4/5 max-w-[638px] mx-auto">
            <h1 className="visually-hidden">Category list</h1>
            <CreateCategoryForm onSubmit={onAddCategory} />
            <CategoryList
              categories={filteredCategories}
              handleDragEnd={handleDragEnd}
              onToggle={onToggleVisibility}
              onDelete={onDelete}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
