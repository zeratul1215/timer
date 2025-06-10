import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import styles from './sidebar.module.css';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        <ol className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/dashboard" className={styles.link}>
              {t('views.dashboard.title')}
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/timer" className={styles.link}>
              {t('views.timer.title')}
            </NavLink>
          </li>
        </ol>
      </div>
    </aside>
  );
};

export default Sidebar;
