import './globals.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CallbackPage from './components/CallbackPage';
import { useAuth0 } from '@auth0/auth0-react';
import "react-toastify/dist/ReactToastify.css";
import { addAccessTokenInterceptor } from './apis/axios';
import { useEffect } from 'react';
import JournalHistory from './components/pages/JournalHistory';
import Layout from './components/Layout';
import MoodGraph from './components/pages/MoodGraph';
import GetHelp from './components/pages/GetHelp';
import { MoodProvider } from './utils/MoodContext';
import { LoaderCircle } from 'lucide-react';


function App() {

  const {getAccessTokenSilently ,isLoading} = useAuth0();

  useEffect(() => {
    addAccessTokenInterceptor(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return (
    <div className="flex justify-center items-center min-h-screen space-x-2">
      <LoaderCircle className="animate-spin"/>
      <span>Loading...</span>
    </div>);
  }

  return (
    <>
      <MoodProvider>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path="callback" element={<CallbackPage />} />
            <Route path="history" element={<JournalHistory />} />
            <Route path="calendar" element={<MoodGraph />} />
            <Route path="help" element={<GetHelp/>}/>
          </Route>
        </Routes>
      </MoodProvider>
    </>
  )
}

export default App
