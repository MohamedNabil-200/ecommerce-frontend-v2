import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
