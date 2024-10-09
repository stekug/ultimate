import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type }) {
  const base = '';

  const styles = {
    primary: base + '',
    small: base + '',
    secondary: '',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
