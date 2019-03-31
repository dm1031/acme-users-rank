import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location, count, topRankedUsers }) => {
    const links = [
        {
            type: 'Home',
            path: '/'
        },
        {
            type: 'Users',
            path: '/users'
        },
        {
            type: 'Create A User',
            path: '/users/create'
        },
        {
            type: 'Top Ranked',
            path: '/users/topRanked'
        }
    ];

    return (
        <ul className="mb-2 nav nav-tabs">
            {
                links.map(link => (
                    <Link to={link.path} key={link.type} className={location.pathname === link.path ? 'nav-link active' : 'nav-link'}>
                        {link.type} {link.type === 'Users' ? count > 0 ? `(${count})` : 0 : link.type === 'Top Ranked' ? `(${topRankedUsers.map(user => (`${user.name}`)).join(' ')})` : '' }
                    </Link>
                ))
            }
        </ul>
    )
}

export default Nav;
