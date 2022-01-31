import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Nav = ({ currentPage }) => {
  const router = useRouter();
  const initialRouteState = [
    {
      route: '/',
      title: 'Home',
      isActive: router.pathname === '/' ? true : false,
    },
    {
      route: '/recipes',
      title: 'Recipes',
      isActive: router.pathname === '/recipes' ? true : false,
    },
    {
      route: '/add',
      title: 'Add',
      isActive: router.pathname === '/add' ? true : false,
    },
    {
      route: '/about',
      title: 'About',
      isActive: router.pathname === '/about' ? true : false,
    },
  ];
  const [routes, setRoutes] = useState(initialRouteState);

  return (
    <>
      <h1>{currentPage}</h1>
      <nav className='navigation'>
        <>
          {routes.map(({ route, title, isActive }, idx) => {
            return (
              <h3
                key={idx}
                className={
                  isActive ? 'navigation-link link-active' : 'navigation-link'
                }
              >
                <Link href={route}>{title}</Link>
              </h3>
            );
          })}
        </>
      </nav>
    </>
  );
};

export default Nav;
