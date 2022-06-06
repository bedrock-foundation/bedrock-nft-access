import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import CollectionList from "../components/CollectionsList";
import PageLayout from "../components/PageLayout";

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
    <PageLayout>
      <CollectionList />
    </PageLayout>
  );
}

export default AuthorizationExample;
