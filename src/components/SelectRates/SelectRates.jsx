import Select from 'react-select';

import symbols from './symbols.json';

import styles from './SelectRates.module.css';

import './ReactSelect.css';
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from '../../redux/currency/slice';

const SelectRates = ({ baseCurrency }) => {
  const dispatch = useDispatch();
  const handleChange = (selectedOption) => { 
    dispatch(setBaseCurrency(selectedOption.value));
  }
  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{ value: baseCurrency, label: baseCurrency }}
        options={symbols}
        onChange={handleChange}
        isSearchable
      />
    </div>
  );
};

export default SelectRates;
