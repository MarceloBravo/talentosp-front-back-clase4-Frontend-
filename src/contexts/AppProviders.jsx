import React from "react";
import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductContext";

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </AuthProvider>
  );
};