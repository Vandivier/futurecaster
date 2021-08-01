import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import useSWR from 'swr';
import fetch from 'unfetch';

// import defaultFetcher from '@commerce/utils/default-fetcher';
import { Avatar } from '@components/common';
import { Bag, Heart } from '@components/icons';
import { useUI } from '@components/ui/context';
import useCart from '@framework/cart/use-cart';
import useCustomer from '@framework/customer/use-customer';

import DropdownMenu from './DropdownMenu';
import s from './UserNav.module.css';

import type { LineItem } from '@framework/types';
interface Props {
    className?: string;
}

const countItem = (count: number, item: LineItem) => count + item.quantity;
const fetcher = (url: any) => fetch(url).then((r) => r.json());

const UserNav: FC<Props> = ({ className }) => {
    const { data: cart } = useCart();
    const { data: customer } = useCustomer();
    const { data: user } = useSWR('/api/user', fetcher);
    const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI();
    const itemsCount = cart?.lineItems.reduce(countItem, 0) ?? 0;

    return (
        <nav className={cn(s.root, className)}>
            <div className={s.mainContainer}>
                <ul className={s.list}>
                    {user?.username && (
                        <li className={s.item} onClick={toggleSidebar}>
                            Hi {user.username}
                        </li>
                    )}
                    <li className={s.item} onClick={toggleSidebar}>
                        <Bag />
                        {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
                    </li>
                    {process.env.COMMERCE_WISHLIST_ENABLED && (
                        <li className={s.item}>
                            <Link href="/wishlist">
                                <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                                    <Heart />
                                </a>
                            </Link>
                        </li>
                    )}
                    <li className={s.item}>
                        {customer ? (
                            <DropdownMenu />
                        ) : (
                            <button className={s.avatarButton} aria-label="Menu" onClick={() => openModal()}>
                                <Avatar />
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default UserNav;
