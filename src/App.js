import { useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/scss/main.css";
import { persistor, Store } from "./redux/store";
import RootRouter from "./routes/RootRouter";
import { connectToServerSocket } from "./utils/socketUtils";
export const axiosApiInstance = axios.create();

function App() {
  const handleSocketConnect = async () => {
    try {

      console.log("Connecting socket");
      await connectToServerSocket();
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    // handleSocketConnect();
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <RootRouter />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}

export default App;
