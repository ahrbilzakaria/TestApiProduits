"use client";
import { useState, useEffect } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./api/categories";

export default function TestCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    libelle: "",
    description: "",
  });
  const [updateData, setUpdateData] = useState({
    code: "",
    libelle: "",
    description: "",
  });
  const [deleteCode, setDeleteCode] = useState("");

  // Fetch categories
  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  // Create category
  const handleCreate = async () => {
    try {
      await createCategory(newCategory);
      setNewCategory({ libelle: "", description: "" });
      loadCategories();
      alert("Category created!");
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };

  // Update category
  const handleUpdate = async () => {
    try {
      await updateCategory(updateData.code, {
        libelle: updateData.libelle,
        description: updateData.description,
      });
      setUpdateData({ code: "", libelle: "", description: "" });
      loadCategories();
      alert("Category updated!");
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  // Delete category
  const handleDelete = async () => {
    try {
      await deleteCategory(deleteCode);
      setDeleteCode("");
      loadCategories();
      alert("Category deleted!");
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  // Load categories on page load
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Categories Manager</h1>

      {/* Fetch Categories */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>All Categories</h2>
        <ul style={styles.list}>
          {categories.map((category) => (
            <li key={category.code} style={styles.listItem}>
              {category.code}
              {"   "} <strong>{category.libelle}</strong>:{category.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Add Category */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Add Category</h2>
        <input
          style={styles.input}
          placeholder="Libelle"
          value={newCategory.libelle}
          onChange={(e) =>
            setNewCategory({ ...newCategory, libelle: e.target.value })
          }
        />
        <input
          style={styles.input}
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
        />
        <button style={styles.button} onClick={handleCreate}>
          Add
        </button>
      </section>

      {/* Update Category */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Update Category</h2>
        <input
          style={styles.input}
          placeholder="Code"
          value={updateData.code}
          onChange={(e) =>
            setUpdateData({ ...updateData, code: e.target.value })
          }
        />
        <input
          style={styles.input}
          placeholder="Libelle"
          value={updateData.libelle}
          onChange={(e) =>
            setUpdateData({ ...updateData, libelle: e.target.value })
          }
        />
        <input
          style={styles.input}
          placeholder="Description"
          value={updateData.description}
          onChange={(e) =>
            setUpdateData({ ...updateData, description: e.target.value })
          }
        />
        <button style={styles.button} onClick={handleUpdate}>
          Update
        </button>
      </section>

      {/* Delete Category */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Delete Category</h2>
        <input
          style={styles.input}
          placeholder="Code"
          value={deleteCode}
          onChange={(e) => setDeleteCode(e.target.value)}
        />
        <button style={styles.button} onClick={handleDelete}>
          Delete
        </button>
      </section>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    minHeight: "100vh",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  section: {
    marginBottom: "30px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "10px",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #444",
    padding: "10px",
    marginBottom: "10px",
    display: "block",
    width: "100%",
    maxWidth: "400px",
  },
  button: {
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
  },
};
