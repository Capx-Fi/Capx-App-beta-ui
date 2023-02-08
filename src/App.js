import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import TopLoader from "./components/topLoader/TopLoader";
import { useFireBaseAuth } from "./hooks/useFirebaseAuth";
import Routes from "./routes/routes";
import {analytics} from './firebase/firebase'
import {logEvent} from 'firebase/analytics'

function App() {
  useFireBaseAuth();
  logEvent(analytics, 'app_opened');
  const authStateReady = useSelector((state) => state.auth.isAuthReady);

  return (
    <div className="App">
      {authStateReady ? (
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      ) : (
        <TopLoader />
      )}
    </div>
  );
}

export default App;
