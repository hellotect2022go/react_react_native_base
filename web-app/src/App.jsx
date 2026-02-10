import { useState } from 'react';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import List2Page from './pages/List2Page';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'list':
        return <ListPage />;
      case 'list2':
        return <List2Page />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <MainLayout onPageChange={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;
