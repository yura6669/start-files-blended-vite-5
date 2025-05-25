import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import Loader from '../components/Loader/Loader';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectError, selectExchangeInfo } from '../redux/currency/selectors';


const Home = () => {
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const exchangeInfo = useSelector(selectExchangeInfo);

  return (
    <Section>
      <Container>
        <ExchangeForm />
        {exchangeInfo &&
          <ExchangeInfo exchangeInfo={exchangeInfo} />}

        {error && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};

export default Home;
