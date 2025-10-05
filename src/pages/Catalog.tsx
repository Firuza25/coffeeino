import React from "react";
import ProductCard from "../features/products/ProductCard";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import { useGetProductsQuery } from "../features/products/productsApi";
import styles from "./Catalog.module.css";
import type { Product } from "../features/products/productsTypes";

const Catalog: React.FC = () => {
  const { data: products = [] } = useGetProductsQuery();

  return (
    <div className={styles.catalogWrapper}>
      <div className={styles.products}>
        <p className={styles.catalog}>Каталог товаров</p>
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.cartWrapper}>
        <CartDrawer />
      </div>
    </div>
  );
};

export default Catalog;
