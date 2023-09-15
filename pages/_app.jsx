
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import "../output.css"
import { Toaster } from "react-hot-toast";

const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain="mumbai"
    >
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  );
}

export default MyApp;
