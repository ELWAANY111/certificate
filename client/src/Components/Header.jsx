import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import header from './headerData';
import './header.css';

const Header = () => {
  const [selectedLink, setSelectedLink] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [height, setHeight] = useState('0px');
  const [list, setList] = useState('');
  const [openList, setOpenList] = useState(false);
  const contentRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle mobile nav height transitions
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (openNav) {
      setHeight('0px');
      // Force reflow for smooth animation
      void el.offsetHeight;
      setHeight(`${el.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [openNav, list, openList]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (openMenu && !event.target.closest('.header-link-item')) {
        setOpenMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  return (
    <>
      <header className="header-container">
        <div className="header-top">
          <a href='https://balady.gov.sa/ar'> 
            <img src="/yvghwoyg.viu.png" className="logo" alt="Logo" />
          </a>
          
          <ul className="header-links">
            {header.map((obj, index) => (
              <li
                key={index}
                className="header-link-item"
              >
                <h6
                  className="header-link"
                  onClick={() => {
                    if (selectedLink === obj.mainheader && openMenu) {
                      setOpenMenu(false);
                    } else {
                      setSelectedLink(obj.mainheader);
                      setOpenMenu(true);
                    }
                  }}>
                  {obj.mainheader}
                  <img 
                    src='/hdigp2bg.kcq.png' 
                    className="chevron-icon" 
                    style={{
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </h6>
              </li>
            ))}
          </ul>
          
          <div className="mobile-menu-container">
            <Menu
              className="mobile-menu-icon"
              onClick={() => setOpenNav(!openNav)}
              style={{
                
                transition: 'transform 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className="mobile-menu-wrapper"
          style={{
            height: openNav ? 'auto' : '0',
            overflow: 'hidden',
            transition: 'height 0.3s ease-in-out'
          }}
        >
          <ul
            ref={contentRef}
            style={{
              height,
              transition: 'height 0.3s ease-in-out',
            }}
            className={`mobile-menu ${openNav ? 'open' : ''}`}
          >
            {header.map((obj, index) => (
              <React.Fragment key={index}>
                <li
                  className="mobile-menu-item"
                  onClick={() => {
                    if (list === obj.mainheader && openList) {
                      setOpenList(false);
                    } else {
                      setList(obj.mainheader);
                      setOpenList(true);
                    }
                  }}
                >   
                  {obj.mainheader}
                  <img 
                    src='/hdigp2bg.kcq.png'
                    style={{
                      transition: 'transform 0.3s ease',
                      marginLeft: '0.5rem'
                    }} 
                  />
                </li>
                
                {openList && list === obj.mainheader && (
                  <div className="submenu-container">
                    <div className="submenu-content">
                      {obj.links.map((innerObj, i) => (
                        <div key={i}>
                          {innerObj.mainhead && (
                            <h1 className="submenu-header">
                              {innerObj.mainhead}
                            </h1>
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
                                >
                                  {head.label}
                                </a>
                              ) : (
                                <span className="submenu-text">
                                  {head.label}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>

        {/* Desktop Dropdown */}
        <div 
          className={`desktop-dropdown-wrapper ${openMenu ? 'open' : ''}`}
          style={{
            transition: 'max-height 0.3s ease-in-out'
          }}
        >
          {header.map((obj, index) =>
            obj.mainheader === selectedLink ? (
              <div key={index} className="dropdown-content">
                <div className="dropdown-columns">
                  {obj.links.map((innerObj, i) => (
                    <div key={i} className="dropdown-column">
                      {innerObj.mainhead && (
                        <h1 className="dropdown-header">{innerObj.mainhead}</h1>
                      )}
                      {innerObj.subhead.map((head, j) => (
                        <div key={j} className="dropdown-item">
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
                              className="dropdown-link"
                            >
                              {head.label}
                            </a>
                          ) : (
                            <span className="dropdown-text">
                              {head.label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="graphic-container">
                  <img 
                    src="/cz1wzjjt.msg.png" 
                    className="dropdown-graphic" 
                    alt="Side graphic" 
                  />
                </div>
              </div>
            ) : null
          )}
        </div>
        <div className="header-white-tape"></div>
      </header>
    </>
  );
};

export default Header;