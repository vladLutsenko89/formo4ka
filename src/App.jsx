import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from './store/store';
import Layout from './components/Layout';
import Main from './components/Main';
import Peremishchennia from './components/Peremishchennia';
import AboutPage from './components/AboutPage';
import ContactsPage from './components/ContactsPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/formo4ka">
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/peremishchennia" element={<Peremishchennia />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
