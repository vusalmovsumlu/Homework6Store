import React, { createContext, useState, ReactNode } from 'react';
import { Product } from '../types/types'; 

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 14',
      price: '1800 AZN',
      description: 'Yaxşı vəziyyətdə, az işlənmiş.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S22',
      price: '1400 AZN',
      description: 'Sürətli və səliqəli.',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: Date.now().toString() };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    );
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};