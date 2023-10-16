import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ text, action }) {
	return (
		<button className={styles.btn} onClick={action}>
			{text}
		</button>
	);
}
Button.propTypes = {
	text: PropTypes.string.isRequired,
};
export default Button;
