import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import header from './headerData';
import styles from './header.module.css'; // Changed to module.css import

const Header = () => {
  const [selectedLink, setSelectedLink] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [list, setList] = useState('');
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const headerLinks = document.querySelector(`.${styles['header-links']}`);
      const dropdownWrapper = document.querySelector(`.${styles['desktop-dropdown-wrapper']}`);
      const mobileMenu = document.querySelector(`.${styles['mobile-menu-wrapper']}`);
      const mobileMenuIcon = document.querySelector(`.${styles['mobile-menu-icon']}`);

      if (
        openMenu &&
        !headerLinks?.contains(event.target) &&
        !dropdownWrapper?.contains(event.target)
      ) {
        setOpenMenu(false);
        setSelectedLink('');
      }

      if (
        openNav &&
        !mobileMenu?.contains(event.target) &&
        !mobileMenuIcon?.contains(event.target)
      ) {
        setOpenNav(false);
        setList('');
        setOpenList(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [openMenu, openNav]);

  return (
    <header className={styles['header-container']}>
      <div className={styles['header-top']}>
        <a href="https://balady.gov.sa/ar">
          <img src="/yvghwoyg.viu.png" className={styles.logo} alt="Logo" />
        </a>

        <ul className={styles['header-links']}>
          {header.map((obj, index) => (
            <li key={index} className={styles['header-link-item']}>
              <h6
                className={styles['header-link']}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedLink === obj.mainheader && openMenu) {
                    setOpenMenu(false);
                    setSelectedLink('');
                  } else {
                    setSelectedLink(obj.mainheader);
                    setOpenMenu(true);
                  }
                }}
              >
                {obj.mainheader}
                <img
                  src="/hdigp2bg.kcq.png"
                  className={styles['chevron-icon']}
                  alt="Dropdown icon"
                />
              </h6>
            </li>
          ))}
        </ul>

        <div className={styles['mobile-menu-container']}>
          <Menu
            className={styles['mobile-menu-icon']}
            onClick={(e) => {
              e.stopPropagation();
              setOpenNav(!openNav);
              setOpenList(false);
              setList('');
            }}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles['mobile-menu-wrapper']} ${openNav ? styles.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className={styles['mobile-menu']}>
          {header.map((obj, index) => (
            <React.Fragment key={index}>
              <li
                className={styles['mobile-menu-item']}
                onClick={(e) => {
                  e.stopPropagation();
                  if (list === obj.mainheader && openList) {
                    setOpenList(false);
                    setList('');
                  } else {
                    setList(obj.mainheader);
                    setOpenList(true);
                  }
                }}
              >
                {obj.mainheader}
                <img
                  src="/hdigp2bg.kcq.png"
                  className={styles['mobile-chevron']}
                  alt="Dropdown icon"
                />
              </li>

              <div
                className={`${styles['submenu-container']} ${openList && list === obj.mainheader ? styles.open : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles['submenu-content']}>
                  {obj.links.map((innerObj, i) => (
                    <div key={i}>
                      {innerObj.mainhead && (
                        <h1 className={styles['submenu-header']}>{innerObj.mainhead}</h1>
                      )}
                      {innerObj.subhead.map((head, j) => (
                        <div key={j} className={styles['submenu-item']}>
                          <img
                            src="/ca3o400a.4rg.png"
                            className={styles['dropdown-dot']}
                            alt="dot"
                          />
                          {head.url ? (
                            <a
                              href={head.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles['submenu-link']}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {head.label}
                            </a>
                          ) : (
                            <span className={styles['submenu-text']}>{head.label}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Desktop Dropdown */}
      <div
        className={`${styles['desktop-dropdown-wrapper']} ${openMenu ? styles.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {openMenu && header.map((obj, index) =>
          obj.mainheader === selectedLink ? (
            <div key={index} className={styles['dropdown-content']}>
              <div className={styles['dropdown-columns']}>
                {obj.links.map((innerObj, i) => (
                  <div
                    key={i}
                    className={
                      obj.mainheader === 'المنصات' || obj.mainheader === 'تواصل معنا'
                        ? styles['special-drop']
                        : styles['dropdown-column']
                    }
                  >
                    {innerObj.mainhead && (
                      <h1 className={styles['dropdown-header']}>{innerObj.mainhead}</h1>
                    )}
                    {(obj.mainheader === 'الخدمات' && i === 1) && (
                      <a
                        target="_blank"
                        className={styles.bigserveice}
                        rel="noopener noreferrer"
                        href="https://balady.gov.sa/ar/services"
                        onClick={(e) => e.stopPropagation()}
                      >
                        قائمه الخدمات
                      </a>
                    )}
                    {innerObj.subhead.map((head, j) => (
                      <div key={j} className={styles['submenu-item']}>
                        <img
                          src="/ca3o400a.4rg.png"
                          className={styles['dropdown-dot']}
                          alt="dot"
                        />
                        {head.url ? (
                          <a
                            href={head.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                              obj.mainheader === 'المنصات' || obj.mainheader === 'تواصل معنا'
                                ? styles['dropdown-header']
                                : styles['dropdown-link']
                            }
                            style={
                              head.label === 'بلدي أعمال'
                                ? { color: 'blue' }
                                : head.label === 'لوحة التحكم'
                                  ? { color: 'rgb(134, 196, 64)' }
                                  : {}
                            }
                            onClick={(e) => e.stopPropagation()}
                          >
                            {head.label}
                            {head.label === 'بلدي أعمال' && (
                              <a
                                className={styles.newB}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://ssoapp.balady.gov.sa/Account/Login?..."
                                onClick={(e) => e.stopPropagation()}
                              >
                                جديد
                              </a>
                            )}
                            {head.label === 'لوحة التحكم' && (
                              <a
                                className={styles.newL}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://ssoapp.balady.gov.sa/Account/Login?..."
                                onClick={(e) => e.stopPropagation()}
                              >
                                جديد
                              </a>
                            )}
                          </a>
                        ) : (
                          <span className={styles['dropdown-text']}>{head.label}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      <div className={styles['header-white-tape']}></div>
    </header>
  );
};

export default Header;