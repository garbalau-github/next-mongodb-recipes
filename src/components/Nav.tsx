import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();
  const routes = [
    {
      route: '/',
      title: 'Home',
      isActive: router.pathname === '/' ? true : false,
    },
    {
      route: '/recipes',
      title: 'All Recipes',
      isActive: router.pathname === '/recipes' ? true : false,
    },
    {
      route: '/add',
      title: 'New Recipe',
      isActive: router.pathname === '/add' ? true : false,
    },
  ];

  return (
    <nav className='navigation'>
      {routes.map(({ route, title, isActive }, idx) => {
        return (
          <h3
            className={
              isActive ? 'navigation-link link-active' : 'navigation-link'
            }
            key={idx}
          >
            <Link href={route}>{title}</Link>
          </h3>
        );
      })}
    </nav>
  );
};

export default Nav;
