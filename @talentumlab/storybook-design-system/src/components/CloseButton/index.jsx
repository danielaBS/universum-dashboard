import styles from "./closeButton.module.css";

const CloseButton = ({
    buttonFunction,
    imagePath,
    imageAlt,
}) => {
    return(
        <div className={styles.container}>
            <button className={styles.closeButton} onClick={() => buttonFunction()}>
                <img src={imagePath} alt={imageAlt}/>
            </button>
        </div>
    );
}

export default CloseButton;