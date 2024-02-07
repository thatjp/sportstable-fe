import {Link} from 'react-router-dom'

interface NavLinkProps {
  link: string;
}

const NavLink = ({link}: NavLinkProps) => {
  return (
    <div className="w-full p-2">
      <Link to={link.toLocaleLowerCase()}>{link}</Link>
    </div>
  );
};

export default NavLink;
