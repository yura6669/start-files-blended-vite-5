import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { exchangeCurrency } from '../../redux/currency/operations';

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => { 
    const regularExpression = new RegExp(`^\\d+(\\.\\d{1,2})?\\s[a-zA-Z]{3}\\sin\\s[a-zA-Z]{3}$`);
    event.preventDefault();
    const input = event.target.querySelector('input').value.trim();
    if (!regularExpression.test(input)) { 
      alert('Invalid input format. Please use the format: "15 USD in UAH"');
      return;
    }
    const [amount, fromCurrency, , toCurrency] = input.split(' ');
    const exchangeInfo = {
      to: toCurrency.toUpperCase(),
      from: fromCurrency.toUpperCase(),
      amount: amount,
    };
    dispatch(exchangeCurrency(exchangeInfo));
    event.target.reset();
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input placeholder="Request format 15 USD in UAH" className={styles.input} />
    </form>
  );
};

export default ExchangeForm;
