import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useCapxWalletConnection from "./utils/useCapxWalletConnection";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";

export default function App() {
  const { connect, account, connectors } = useCapxWalletConnection();

  const recoveredAddress = React.useRef();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });
  console.log(account);
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            connect({ connector: connectors[0] });
          }}
        >
          Connect wallet
        </button>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const message = formData.get("message");
            signMessage({ message });
          }}
        >
          <label htmlFor="message">Enter a message to sign</label>
          <textarea
            id="message"
            name="message"
            placeholder="The quick brown fox…"
          />
          <button disabled={isLoading}>
            {isLoading ? "Check Wallet" : "Sign Message"}
          </button>

          {data && (
            <div>
              <div>Recovered Address: {recoveredAddress.current}</div>
              <div>Signature: {data}</div>
            </div>
          )}

          {error && <div>{error.message}</div>}
        </form>
      </header>
    </div>
  );
}
