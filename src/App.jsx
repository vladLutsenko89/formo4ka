import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MilitaryForm from './components/MilitaryForm';

function App() {
  return (
    <Provider store={store}>
      <MilitaryForm />
    </Provider>
  );
}

export default App;