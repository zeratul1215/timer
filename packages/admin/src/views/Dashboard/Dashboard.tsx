import { useTranslation } from 'react-i18next';
import styles from './dashboard.module.css';

const DashboardView = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>{t('views.dashboard.title')}</h1>
      
    </div>
  );
};

export default DashboardView;