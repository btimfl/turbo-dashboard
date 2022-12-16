import { Icon } from '@chakra-ui/react';
import { FaCartArrowDown, FaChartBar, FaDollarSign, FaShoppingBag, FaUserAlt } from 'react-icons/fa';
import {IoTicketOutline,IoSettings } from 'react-icons/io5';
import { string } from 'yup/lib/locale';


export const MENU_ITEMS = [
    {
        icon: <Icon as={FaChartBar}></Icon>,
        title: 'Dashboard',
        children: [],
        path: '/dashboard'
    },
    {
        icon: <Icon as={FaShoppingBag}></Icon>,
        title: 'Orders',
        children: [],
        path: '/orders'
    },
    {
        icon: <Icon as={FaDollarSign}></Icon>,
        title: 'Payment Gateways',
        children: [
            {
                title: 'Payment Gateways',
                path: '/payments'
            },
            {
                title: 'Add New Payment Gateway',
                path: '/add-payment'
            }
        ],
        path: '/payments'
    },
    {
        icon: <Icon as={FaCartArrowDown}></Icon>,
        title: 'Abandoned Carts',
        children: [],
        path: '/abandoned-carts'
    },
    {
        icon: <Icon as={IoTicketOutline}></Icon>,
        title: 'Promo & Loyalty',
        children: [],
        path: '/promos-loyalty'
    },
    {
        icon: <Icon as={FaUserAlt}></Icon>,
        title: 'User Management',
        children: [
            {
                title: 'Users',
                path: '/users'
            },
            {
                title: 'Add User',
                path: '/add-user'
            }
        ],
        path: '/users'
    },
    {
        icon: <Icon as={IoSettings}></Icon>,
        title: 'Platform Settings',
        children: [],
        path: '/settings'
    },

]