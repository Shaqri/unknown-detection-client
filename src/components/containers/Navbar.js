import { nav } from '../../style/Navbar.module.css'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleDropdown } from '../../actions/index';
import { useLocation } from 'react-router-dom';
import BackButton from '../presentationals/buttons/Back';
import DropdownButton from '../presentationals/buttons/Dropdown';
import NavCurrentPath from '../presentationals/NavCurrentPath';

function Navbar (props) {
  const { toggleDropdown } = props;
  const location = useLocation();
  const currentPath = location.pathname.split('/');

  const handleDropdown = () => {
    toggleDropdown();
  };

  return(
    <>
      <div className={nav}>
      { currentPath.length < 3 ? <DropdownButton handleClick={handleDropdown}/> : <BackButton /> }
      <NavCurrentPath value="panalardo"/>
      <div><FontAwesomeIcon icon="search"/></div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => {dispatch(toggleDropdown())},
});



export default connect(null, mapDispatchToProps)(Navbar);