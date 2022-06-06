import React from "react";
import styled from "@emotion/styled";
import Navigation from "./Navigation";

const Container = styled.div`
  
`;

const Content = styled.div`
  padding: 0 32px;
`;

type PageLayoutProps = {
  children: any
};

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
}) => {
  return (
    <Container>
      <Navigation />
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default PageLayout;
