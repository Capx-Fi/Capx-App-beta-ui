import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import { useFireBaseAuth } from "./hooks/useFirebaseAuth";
import { useFireBaseLogin } from "./hooks/useFirebaseLogin";
import Routes from "./routes/routes";

function App() {
  useFireBaseAuth();
  const authStateReady = useSelector((state) => state.auth.isAuthReady);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(authStateReady, isLoggedIn);
  return (
    <div className="App">
      {authStateReady ? (
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      ) : (
        <Modal />
      )}
    </div>
  );
}

export default App;
