/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from 'react';
import Link from 'next/link';

import { useAuth } from '../auth/useAuth';

const Layout: FunctionComponent = ({ children }) => {
  const { user, authenticated, logout } = useAuth();

  return (
    <div className="bg-gray-900 max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800 h-[64px]">
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="/">
            <a>
              <img
                src="/home-color.svg"
                alt="home house"
                className="inline w-6"
              />
            </a>
          </Link>
          {authenticated ? (
            <>
              <Link href="/houses/add">
                <a>Add House</a>
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/auth">
              <a>Login / Signup</a>
            </Link>
          )}
        </div>
      </nav>
      <main className="screen-min-height-full-less-nav">{children}</main>
    </div>
  );
};

export default Layout;
