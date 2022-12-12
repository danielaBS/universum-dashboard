import styles from "./profileMenu.module.css";
import PropTypes from "prop-types";

const ProfileMenu = ({
    menuList
}) => {
    return(
        <div className={styles.container}>
          <div className={styles.triangle}></div>
            {menuList.map((element, index) => (
                <div className={styles.option} key={index}>
                    <p onClick={() => element.optionFunction()}>{element.title}</p>
                    <div className={styles.divider}></div>
                </div>
            ))}
        </div>
    );
}

export default ProfileMenu;

ProfileMenu.propTypes = {
  menuList: PropTypes.array
}

ProfileMenu.defaultProps = {
  menuList: [{
    title: "Default Option",
    optionFunction: () => alert("This will be a function.")
  }]
}