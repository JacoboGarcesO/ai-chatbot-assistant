import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.layoutMain}>
        <Header />
        <div className={`${styles.layoutContent} gems-scrollbar`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
