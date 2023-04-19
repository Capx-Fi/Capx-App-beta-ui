import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";


import { config } from "../config";

const web3auth = new Web3AuthNoModal({
  clientId: config.WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: "cyan",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155, // SOLANA, OTHER
    chainId: "0x1",
  },
});

const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      clientId: config.WEB3AUTH_CLIENT_ID, //Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
      uxMode: "redirect",
      loginConfig: {
        jwt: {
          name: "webapp",
          verifier: "w3a-capx-verifier",
          typeOfLogin: "jwt",
          clientId: config.WEB3AUTH_CLIENT_ID,
        },
      },
    },
  });
  
  web3auth.configureAdapter(openloginAdapter);

  export {web3auth};