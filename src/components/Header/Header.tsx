import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAppDispatch } from "../../app/hooks";
import { openCart } from "../../cart/cartSlice"; 
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.desktopHeader}>
        <Link to="/" className={styles.title}>COFFEINO</Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>Главная</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? styles.active : styles.link}>Каталог</NavLink>
          <NavLink to="/track" className={({ isActive }) => isActive ? styles.active : styles.link}>Поиск заказа</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : styles.link}>О нас</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : styles.link}>Контакты</NavLink>
        </nav>

        <div className={styles.actions}>
          <button className={styles.langBtn}>
            ENG <IoIosArrowDown className={styles.arrow}/>
          </button>
        </div>
      </div>

      <div className={styles.mobileHeader}>
        <button onClick={() => setMenuOpen(true)} className={styles.iconBtn}>
          <FaBars />
        </button>

        <button className={styles.langBtn}>
          ENG <IoIosArrowDown className={styles.arrow}/>
        </button>

        <Link to="/" className={styles.title}>COFFEINO</Link>
        <Link to="/shop" className={styles.mobileCatalog}>Каталог</Link>


        <button
          className={styles.iconBtn}
          onClick={() => dispatch(openCart())}
        >
          <FaShoppingCart />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.overlay}>
          <div className={styles.overlayBox}>
            <div className={styles.overlayHeader}>
              <Link to="/" className={styles.title}>COFFEINO</Link>
              <button onClick={() => setMenuOpen(false)} className={styles.closeBtn}>
                <IoClose />
              </button>
            </div>
            <nav className={styles.overlayNav}>
              <NavLink to="/" className={({ isActive }) => 
                isActive ? styles.overlayActive : styles.overlayLink
              } onClick={() => setMenuOpen(false)}>
                Главная
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => 
                isActive ? styles.overlayActive : styles.overlayLink
              } onClick={() => setMenuOpen(false)}>
                О нас
              </NavLink>
              <NavLink to="/track" className={({ isActive }) => 
                isActive ? styles.overlayActive : styles.overlayLink
              } onClick={() => setMenuOpen(false)}>
                Поиск заказа
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => 
                isActive ? styles.overlayActive : styles.overlayLink
              } onClick={() => setMenuOpen(false)}>
                Контакты
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
