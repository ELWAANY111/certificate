
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import header from './headerData';
import './header.css';

const Header = () => {
  const [selectedLink, setSelectedLink] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [list, setList] = useState('');
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const headerLinks = document.querySelector('.header-links');
      const dropdownWrapper = document.querySelector('.desktop-dropdown-wrapper');
      const mobileMenu = document.querySelector('.mobile-menu-wrapper');
      const mobileMenuIcon = document.querySelector('.mobile-menu-icon');

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
    <header className="header-container">
      <div className="header-top">
        <a href="https://balady.gov.sa/ar">
          <img src="/yvghwoyg.viu.png" className="logo" alt="Logo" />
        </a>

        <ul className="header-links">
          {header.map((obj, index) => (
            <li key={index} className="header-link-item">
              <h6
                className="header-link"
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
                  className="chevron-icon"
                  alt="Dropdown icon"
                />
              </h6>
            </li>
          ))}
        </ul>

        <div className="mobile-menu-container">
          <Menu
            className="mobile-menu-icon"
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
        className={`mobile-menu-wrapper ${openNav ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="mobile-menu">
          {header.map((obj, index) => (
            <React.Fragment key={index}>
              <li
                className="mobile-menu-item"
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
                  className="mobile-chevron"
                  alt="Dropdown icon"
                />
              </li>

              <div
                className={`submenu-container ${openList && list === obj.mainheader ? 'open' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="submenu-content">
                  {obj.links.map((innerObj, i) => (
                    <div key={i}>
                      {innerObj.mainhead && (
                        <h1 className="submenu-header">{innerObj.mainhead}</h1>
                      )}
                      {innerObj.subhead.map((head, j) => (
                        <div key={j} className="submenu-item">
                          <img
                            src="/ca3o400a.4rg.png"
                            className="dropdown-dot"
                            alt="dot"
                          />
                          {head.url ? (
                            <a
                              href={head.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="submenu-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {head.label}
                            </a>
                          ) : (
                            <span className="submenu-text">{head.label}</span>
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
        className={`desktop-dropdown-wrapper ${openMenu ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {openMenu && header.map((obj, index) =>
          obj.mainheader === selectedLink ? (
            <div key={index} className="dropdown-content">
              <div className="dropdown-columns">
                {obj.links.map((innerObj, i) => (
                  <div
                    key={i}
                    className={
                      obj.mainheader === 'المنصات' || obj.mainheader === 'تواصل معنا'
                        ? 'special-drop'
                        : 'dropdown-column'
                    }
                  >
                    {innerObj.mainhead && (
                      <h1 className="dropdown-header">{innerObj.mainhead}</h1>
                    )}
                    {(obj.mainheader === 'الخدمات' && i === 1) && (
                      <a
                        target="_blank"
                        className="bigserveice"
                        rel="noopener noreferrer"
                        href="https://balady.gov.sa/ar/services"
                        onClick={(e) => e.stopPropagation()}
                      >
                        قائمه الخدمات
                      </a>
                    )}
                    {innerObj.subhead.map((head, j) => (
                      <div key={j} className="submenu-item">
                        <img
                          src="/ca3o400a.4rg.png"
                          className="dropdown-dot"
                          alt="dot"
                        />
                        {head.url ? (
                          <a
                            href={head.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                              obj.mainheader === 'المنصات' || obj.mainheader === 'تواصل معنا'
                                ? 'dropdown-header'
                                : 'dropdown-link'
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
                                className="newB"
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
                                className="newL"
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
                          <span className="dropdown-text">{head.label}</span>
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

      <div className="header-white-tape"></div>
    </header>
  );
};

export default Header;
