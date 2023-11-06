"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import axios from "axios";
import { BarLoader } from "react-spinners";

import SearchForm from "@/components/SearchForm";
import CreateCategoryForm from "@/components/CreateCategoryForm";
import CategoryList from "@/components/CategoryList";
import { confirmAndRun, confirmAndRunCustom } from "@/utils/confirm";

import "react-confirm-alert/src/react-confirm-alert.css";
import "../styles/custom-confirm-dialog.css";
import moveItem from "@/utils/moveItem";

const LOGOIMG = "/images/logo.png";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setLoading(true);
    axios
      .get("api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setError("Error loading categories: " + error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const movedCatagories = moveItem(
      result.source.index,
      result.destination.index,
      categories
    );

    setLoading(true);
    axios
      .put("api/categories/reorder", movedCatagories)
      .then((response) => {
        const updatedCategories = response.data.updatedCategories;
        setCategories(updatedCategories);
      })
      .catch((error) => {
        setError("Error dragging category: " + error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleAddCategory = (values) => {
    setLoading(true);
    axios
      .post("api/categories", {
        title: values.title,
        isVisible: false,
        isReadonly: false,
      })
      .then((response) => {
        const { newCategory } = response.data;
        const updatedCategories = [...categories, newCategory].sort(
          (a, b) => a.order - b.order
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        setError("Error adding category: " + error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteCategory = (categoryId) => {
    setLoading(true);
    axios
      .delete(`api/categories?id=${categoryId}`)
      .then(() => {
        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        setError("Error deleting category: " + error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleToggleVisibility = (categoryId) => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <header className="fixed w-full border border-transparent bg-[#1e1e27] z-10 border-b-[#313442]">
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
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-4">
                {error}
                <button
                  onClick={() => setError(null)}
                  className="bg-[#333] text-green-300 hover:text-green-800 focus:outline-none p-2 ml-3"
                  aria-label="Clear Error"
                >
                  Clear Error
                </button>
              </div>
            )}
            {!loading ? (
              <CategoryList
                categories={filteredCategories}
                handleDragEnd={handleDragEnd}
                onToggle={onToggleVisibility}
                onDelete={onDelete}
              />
            ) : (
              <div className="flex items-center justify-center mt-10">
                <BarLoader loading={loading} aria-label="Loading Spinner" />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
