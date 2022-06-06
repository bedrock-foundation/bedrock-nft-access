import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import CollectionList from "./components/CollectionsList";

function AuthorizationExample() {

  const location = useLocation();
  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag("config", "G-43HKQKDVV2", {
        page_path: url,
      });
    };

    handleRouteChange(location.pathname);
  }, [location]);

  return (
    <div>
      <Navigation />
      <CollectionList />
    </div>
  );
}

export default AuthorizationExample;
