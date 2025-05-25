import { Wave } from 'react-animated-text';

import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Loader from '../components/Loader/Loader';
import RatesList from '../components/RatesList/RatesList';
import Filter from '../components/Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { latestRates } from '../redux/rates/operations';
import { selectCurrency } from '../redux/currency/selectors';
import { selectFilteredRates, selectRates, selectIsLoading, selectError } from '../redux/rates/selectors';

const Rates = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const baseCurrency = useSelector(selectCurrency);
  const filteredRates = useSelector(selectFilteredRates);
  const rates = useSelector(selectRates);
  const isShowRates = rates && Object.keys(rates).length > 0;

  useEffect(() => {
    dispatch(latestRates(baseCurrency));
   }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {isShowRates && <Filter />}
        {isShowRates && <RatesList rates={filteredRates} />}
        {isLoading && <Loader />}
        {error && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
