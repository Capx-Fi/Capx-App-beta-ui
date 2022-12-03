import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useFireBaseAuth } from "./hooks/useFirebaseAuth";
import Routes from "./routes/routes";

function App() {
  useFireBaseAuth();
  const authStateReady = useSelector((state)=>state.auth.isAuthReady);

  return (
    <BrowserRouter>
    {authStateReady && <Routes/>}
    {/* <Routes isloggedIn={!!currentUser} /> */}
    </BrowserRouter>
  );
}

export default App;
