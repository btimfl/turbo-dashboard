import { Icon } from '@chakra-ui/react';
import { FaCartArrowDown, FaChartBar, FaDollarSign, FaShoppingBag, FaUserAlt } from 'react-icons/fa';
import { IoTicketOutline, IoSettings } from 'react-icons/io5';
import { string } from 'yup/lib/locale';


export const MENU_ITEMS = [
    {
        icon: <Icon as={FaChartBar}></Icon>,
        title: 'Dashboard',
        children: [],
        path: '/dashboard'
    },
    {
        icon: <Icon as={FaUserAlt}></Icon>,
        title: 'User Management',
        children: [
            {
                title: 'Users',
                path: '/'
            },
            {
                title: 'Add User',
                path: '/add'
            }
        ],
        path: '/users'
    },
]