import React, { useEffect, useState } from "react";
import styles from "./CartDrawer.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearCart,
  closeCart,
  removeFromCart,
  updateQty,
} from "../../cart/cartSlice";

type CartItem = {
  product: {
    id: number;
    title: string;
    price: number;
    images?: string[];
    inStock?: number;
  };
  qty: number;
};

const CartDrawer: React.FC = () => {
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile && !isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const handleQtyChange = (id: number, newQty: number) => {
    if (newQty >= 1) dispatch(updateQty({ id, qty: newQty }));
  };

  const handleRemove = (id: number) => dispatch(removeFromCart(id));

  return (
    <>
      {isMobile && isOpen && (
        <div
          className={`${styles.overlay} ${styles.fadeIn}`}
          onClick={() => dispatch(closeCart())}
        />
      )}
      <aside
        className={`${styles.drawer} ${
          isMobile ? styles.mobile : styles.desktop
        } ${isOpen ? styles.open : ""}`}
        role="complementary"
        aria-label="cart"
      >
        <header className={styles.header}>
          <h2>Корзина</h2>
          <button
            className={styles.close}
            onClick={() => dispatch(closeCart())}
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <p className={styles.empty}>Корзина пуста</p>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map(({ product, qty }: CartItem) => {
                const max =
                  typeof product.inStock === "number"
                    ? product.inStock
                    : undefined;
                const canIncrease =
                  typeof max === "number" ? qty < max : true;

                return (
                  <li key={product.id} className={styles.item}>
                    <img
                      src={product.images?.[0] ?? "/images/coffee-bag.png"}
                      alt={product.title}
                      className={styles.image}
                    />
                    <div className={styles.info}>
                      <h4 className={styles.title}>{product.title}</h4>
                      <div className={styles.meta}>
                        <span>{product.price.toLocaleString("ru-KZ")} ₸ / шт</span>
                        {typeof max === "number" && (
                          <span className={styles.stock}>осталось: {max}</span>
                        )}
                      </div>
                      <div className={styles.controls}>
                        <button
                          onClick={() => handleQtyChange(product.id, qty - 1)}
                          disabled={qty <= 1}
                        >
                          −
                        </button>
                        <span className={styles.qty}>{qty}</span>
                        <button
                          onClick={() => handleQtyChange(product.id, qty + 1)}
                          disabled={!canIncrease}
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.itemTotal}>
                        <strong>
                          {(product.price * qty).toLocaleString("ru-KZ")} ₸
                        </strong>
                      </div>
                    </div>
                    <button
                      className={styles.remove}
                      onClick={() => handleRemove(product.id)}
                    >
                      <img src="/images/trash.svg" alt="trash" className={styles.trash} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <footer className={styles.footer}>
              <div className={styles.total}>
                <span>Итого</span>
                <strong>{total.toLocaleString("ru-KZ")} ₸</strong>
              </div>
              <button className={styles.checkout}>Оформить заказ</button>
              <button
                className={styles.clear}
                onClick={() => dispatch(clearCart())}
              >
                Очистить
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
