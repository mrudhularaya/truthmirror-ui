import { Auth0Provider } from "@auth0/auth0-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Auth0WithNavigateProps = {
  children: ReactNode;
};


export const Auth0WithNavigate = ({children}:Auth0WithNavigateProps) => {

  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  const onredirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if(!(domain && clientId && redirectUri)){
    return null;
  }

  return (
      <Auth0Provider
        domain= {domain}
        clientId= {clientId}
        authorizationParams={{
          redirect_uri: redirectUri,
          audience: audience
        }}
        onRedirectCallback={onredirectCallback}
        >
        {children}
      </Auth0Provider>
  );
};
