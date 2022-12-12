import styles from "./stepList.module.css";

const StepList = ({
    title,
    children,
}) => {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <div className={styles.container_divider}></div>
            <div className={styles.container_card_info}>
                <div className={styles.childrenContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default StepList;