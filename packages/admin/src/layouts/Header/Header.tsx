import { useTranslation } from 'react-i18next';
import styles from './header.module.css';
import { setLocale } from '@link/admin/i18n';
import { Select } from '@linktivity/link-ui';
import { useMemo, useState } from 'react';

const Header: React.FC = () => {
  const { i18n, t } = useTranslation();

  const [lang, setLang] = useState(i18n.language);


  const options = useMemo(() => [
    { label: 'English', value: 'en' },
    { label: '日本語', value: 'ja' },
    { label: '中文', value: 'zh' },
  ], []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          Link
        </a>
        <div className={styles.selectContainer}>
          <span className={styles.selectLabel}>{t('header.language')}</span>
          <Select 
            options={options}
            value={lang}
            onSelect={(value) => {
              setLang(value);
              setLocale(value);
            }}
            clearable={false}
            className={styles.select}
          />
        </div>
        
      </div>
    </header>
  );
};

export default Header;
