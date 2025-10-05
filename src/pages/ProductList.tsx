// import React from 'react';
// import { useGetProductsQuery } from '../features/products/productsApi';
// import ProductCard from '../features/products/ProductCard';
// import styles from './ProductsList.module.css';

// const ProductsList: React.FC = () => {
//   const { data: products, isLoading, error } = useGetProductsQuery();

//   if (isLoading) {
//     return (
//       <div className={styles.loading}>
//         <p>Загрузка продуктов...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.error}>
//         <p>Ошибка загрузки продуктов</p>
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className={styles.empty}>
//         <p>Продукты не найдены</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.list}>
//       {products.map(product => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductsList;