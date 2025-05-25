import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const Rates = lazy(() => import("./pages/Rates"));
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrency } from "./redux/currency/selectors";
import { getUserInfo } from "./redux/currency/operations";


export const App = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectCurrency);

  useEffect(() => { 
    if (!baseCurrency) { 
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  

  return <>
    <Suspense fallback={<Loader />}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </>
};

export default App;
