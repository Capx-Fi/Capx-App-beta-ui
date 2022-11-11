import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useCapxWalletConnection from "./utils/useCapxWalletConnection";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessage } from "./pages/sign-message";

window.Buffer = window.Buffer || require("buffer").Buffer;

export default function App() {
  const { connect, active, connectors } = useCapxWalletConnection();

  const recoveredAddress = React.useRef();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  return (
    <div className="App">
      <main className="App-header">
        {!active ? (
          <>
            <button
              onClick={() => {
                connect({ connector: connectors[0] });
              }}
            >
              metamask
            </button>
            <button
              onClick={() => {
                connect({ connector: connectors[1] });
              }}
            >
              WalletConnect
            </button>
          </>
        ) : (
          <SignMessage />
        )}
      </main>
    </div>
  );
}
