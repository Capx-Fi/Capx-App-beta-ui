import {useEffect, useState} from 'react'
import { ADAPTER_EVENTS} from "@web3auth/base"
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { config } from '../config';

export const useWeb3Auth = () => {
    const [web3AuthInstance, setWeb3AuthInstance] = useState(null)
    useEffect(()=>{
        const run = async () => {
            const web3auth = new Web3AuthNoModal({
                clientId: config.WEB3AUTH_CLIENT_ID,
                web3AuthNetwork: "testnet",
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
                        verifier: config.WEB3AUTH_VERIFIER,
                        typeOfLogin: "jwt",
                        clientId: config.WEB3AUTH_CLIENT_ID,
                      },
                    },
                  },
                });
                
                web3auth.configureAdapter(openloginAdapter);
            await web3auth.init();
            web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
                console.log("connecting");
            });
        
            web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
                console.log("disconnected");
            });
        
            web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
                console.error("some error or user has cancelled login request", error);
            });
        
            setWeb3AuthInstance(web3auth);
        }
        run()
        .then(() => {})
        .catch(error => console.log(`[Error] ${error.message}`))
    },[])
    return web3AuthInstance
}
 
