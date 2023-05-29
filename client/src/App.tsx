import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import AppLayout from './Layout';
import Home from './pages/Home';
import NoAuth from './pages/NoAuth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';


const App: React.FC = () => {

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      console.log('User is signed in');
      navigate('/');
    } else {
      console.log('User is signed out');
      navigate('/no-auth');
    }
  });

  return (
    <Routes>
      <Route path="/" element={<AppLayout user={user} />}>
        <Route index element={<Home/>} />
        <Route path="browse" element={<Home/>} />
        <Route path="account" element={<Home/>} />
        <Route path="no-auth" element={<NoAuth/>} />
      </Route>
    </Routes>
  );
};

export default App;
