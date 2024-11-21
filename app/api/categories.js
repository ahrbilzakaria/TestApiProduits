const API_URL = "http://localhost:8080/demo-1.0-SNAPSHOT/api/categories"; // Update the port if necessary

// Fetch all categories
export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
};

// Fetch a single category by code
export const fetchCategory = async (code) => {
  const response = await fetch(`${API_URL}/${code}`);
  if (!response.ok)
    throw new Error(`Failed to fetch category with code: ${code}`);
  return await response.json();
};

// Create a new category
export const createCategory = async (data) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create category");
  return await response.json();
};

// Update an existing category
export const updateCategory = async (code, data) => {
  const response = await fetch(`${API_URL}/${code}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok)
    throw new Error(`Failed to update category with code: ${code}`);
  return await response.json();
};

// Delete a category
export const deleteCategory = async (code) => {
  const response = await fetch(`${API_URL}/${code}`, {
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error(`Failed to delete category with code: ${code}`);
};
