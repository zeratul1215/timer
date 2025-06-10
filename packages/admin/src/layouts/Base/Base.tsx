import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Header';
import Sidebar from '../Sidebar';
import styles from './base.module.css';

const BaseLayout: React.FC = () => {
  return (
    <div className={styles.base}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.inner}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
