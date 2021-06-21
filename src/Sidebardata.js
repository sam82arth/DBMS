import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as ImIcons from 'react-icons/im';
import * as GiIcons from 'react-icons/gi';

export const Sidebardata=[
    {
        title: 'Home',
        path:'/',
        icon:<AiIcons.AiOutlineUserAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Add Staff',
        path:'/AddStaff',
        icon:<AiIcons.AiOutlineUserAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Add Student',
        path:'/AddStudent',
        icon:<MdIcons.MdPersonAdd />,
        cName: 'nav-text'
    },
    {
        title: 'See Students',
        path:'/Profile',
        icon:<ImIcons.ImUser />,
        cName: 'nav-text'
    },
    {
        title: 'See teacher',
        path:'/Support',
        icon:<GiIcons.GiTeacher />,
        cName: 'nav-text'
    },
]