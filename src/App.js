import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import { useFireBaseAuth } from "./hooks/useFirebaseAuth";
import Routes from "./routes/routes";

function App() {
  useFireBaseAuth();
  const authStateReady = useSelector((state)=>state.auth.isAuthReady);

  return (
    <div className="App">
      {authStateReady ?
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>: <Modal/>}
    </div>
   
  );
}

export default App;
