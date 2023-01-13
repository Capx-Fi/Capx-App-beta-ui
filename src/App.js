import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import TopLoader from "./components/topLoader/TopLoader";
import { useFireBaseAuth } from "./hooks/useFirebaseAuth";
import Routes from "./routes/routes";

function App() {
  useFireBaseAuth();
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
