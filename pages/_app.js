import { AuthProvider } from '@hooks/useAuth';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <AuthProvider>      
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
