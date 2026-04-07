import { useStore } from '@/store/useStore';
import { HomePage } from '@/pages/HomePage';
import { BookingPage } from '@/pages/BookingPage';
import { ConfirmationPage } from '@/pages/ConfirmationPage';
import { TrackingPage } from '@/pages/TrackingPage';
import { AdminPage } from '@/pages/AdminPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import './App.css';

function App() {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'booking':
        return <BookingPage />;
      case 'confirmation':
        return <ConfirmationPage />;
      case 'tracking':
        return <TrackingPage />;
      case 'admin':
        return <AdminPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {renderPage()}
    </div>
  );
}

export default App;
