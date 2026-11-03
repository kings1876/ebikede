'use client';
import React from 'react';
import { useShop } from '../context/ShopContext';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  href: string;
  /** runs after a normal (client-side) navigation, e.g. to close a menu */
  onNavigate?: () => void;
};

/**
 * A real <a href> (crawlable, middle-click / open-in-new-tab / copy-link work) that navigates
 * client-side on a plain left click.
 */
export const NavLink: React.FC<Props> = ({ href, onNavigate, children, ...rest }) => {
  const { navigateTo } = useShop();
  return (
    <a
      {...rest}
      href={href}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigateTo(href);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
};
