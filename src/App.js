import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import HomePage from './pages/Home';
import NewsPage from './pages/News';
import CryptocurrenciesPage from './pages/Cryptocurrencies';
import ExchangesPage from './pages/Exchanges';
import CryptoDetailsPage from './pages/CryptoDetails';
import Layout from './components/Layout';
import theme from './styles/theme';


function App() {
    return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
              <Routes>
                  <Route element={<Layout />}>
                      <Route index element={<HomePage />} />
                      <Route path='home' element={<HomePage />} />
                      <Route path='news' element={<NewsPage />} />
                      <Route path='exchanges' element={<ExchangesPage />} />
                      <Route path='cryptocurrencies' element={<CryptocurrenciesPage />} />
                      <Route path='crypto/:coinId' element={<CryptoDetailsPage />} />
                  </Route>
              </Routes>
          </Router>
      </ThemeProvider>
    );
}

export default App;
