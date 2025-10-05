import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import type { Product } from "../../features/products/productsTypes";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../cart/cartSlice";

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const [showNotification, setShowNotification] = useState(false);

  const increment = () =>
    setQuantity((q) => {
      if (product.inStock && q >= product.inStock) return q;
      return q + 1;
    });

  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const addItem = () => {
    if (product.inStock === 0) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setQuantity(1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // скрыть через 2 секунды
  };


  const renderRoastLevel = (roast?: string) => {
    if (!roast) return null;
    const levels: Record<string, number> = {
      Светлая: 1,
      Средняя: 3,
      "Средне-тёмная": 4,
      Тёмная: 5,
    };
    const darkBeans = levels[roast] || 3;
    return (
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {Array.from({ length: 5 }, (_, i) => (
          <img
            key={i}
            src={i < darkBeans ? "/images/dark.svg" : "/images/light.svg"}
            alt=""
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
        ))}
      </div>
    );
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <article className={styles.card}>
      <div
        className={styles.imageWrap}
        style={{ backgroundColor: product.bgColor }}
      >
        {product.form === "Готовый напиток" && (
          <div className={styles.badge}>НОВИНКА</div>
        )}
        <img
          src={product.images?.[0] ?? "/images/coffee-bag.png"}
          alt={product.title}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.sku}>Артикул: {product.sku}</div>

        <h2 className={styles.title}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h2>

        <div className={styles.specs}>
          {product.type && (
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Тип:</span>
              <span className={styles.specValue}>{product.type}</span>
            </div>
          )}
          {product.roast && (
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Обжарка:</span>
              <span className={styles.specValue}>
                {renderRoastLevel(product.roast)}
              </span>
            </div>
          )}
          {product.form && (
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Форма:</span>
              <span className={styles.specValue}>{product.form}</span>
            </div>
          )}
          {product.composition && (
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Состав:</span>
              <span className={styles.specValue}>{product.composition}</span>
            </div>
          )}
          {product.volume && (
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Объём:</span>
              <span className={styles.specValue}>{product.volume}</span>
            </div>
          )}
        </div>

        {product.weight && (
          <button className={styles.weightButton}>{product.weight}</button>
        )}

        <div className={styles.descriptionSection}>
          <p className={styles.description}>
            {isExpanded
              ? product.description
              : truncateText(product.description, 150)}
          </p>
          {product.description.length > 150 && (
            <button
              className={styles.expandButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Скрыть" : "Подробнее"}
              <span style={{ marginLeft: 4 }}>{isExpanded ? "▲" : "▼"}</span>
            </button>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            {product.price.toLocaleString("ru-KZ")} ₸
          </div>

          <div className={styles.counter}>
            <button
              className={`${styles.counterBtn} ${styles.decrement}`}
              onClick={decrement}
              aria-label="Уменьшить количество"
            >
              −
            </button>

            <span className={styles.quantity}>{quantity}</span>

            <button
              className={`${styles.counterBtn} ${styles.increment}`}
              onClick={increment}
              disabled={product.inStock !== undefined && quantity >= product.inStock}
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>


          <button
            className={styles.addToCart}
            onClick={addItem}
            disabled={product.inStock === 0}
          >
            {product.inStock === 0 ? "Нет в наличии" : "В корзину"}
          </button>
        </div>
      </div>
      {showNotification && (
        <div className={styles.notification}>
          {product.title} добавлен в корзину  ✅
        </div>
      )}

    </article>
  );
};

export default ProductCard;
