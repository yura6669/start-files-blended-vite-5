import styles from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filter/slice';
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => { 
    const query = event.target.value.trim().toLowerCase();
    dispatch(changeFilter(query));
  }
  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      onChange={handleChange}
    />
  );
};

export default Filter;
