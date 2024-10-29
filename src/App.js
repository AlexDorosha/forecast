import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import { Input } from './Input';
import { CardList } from './CardList';
import { ErrorBoundary } from './ErrorBoundary';
import { useCitiesList } from './hooks/useCitiesList';
import { SingleCity } from './SingleCity';

export const GlobalContext = React.createContext();

function App() {
  const [state, dispatch] = useCitiesList();
  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route
            path="/home"
            element={
              <div className="Main">
                <Input />
                <ErrorBoundary>
                  <CardList />
                </ErrorBoundary>
              </div>
            }
          />
          <Route path="/city/:city"
            element={
              <SingleCity />
            } />
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
