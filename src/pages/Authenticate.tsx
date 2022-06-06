import React from "react";
import styled from "@emotion/styled";
import Colors from "../styles/Colors";
import { useRecoilState } from "recoil";
import {
  useBedrock,
  useCreateNonceLink,
  useNonceSocket,
  AuthorizationData,
  TransactionStatuses,
} from "@bedrock-foundation/react-sdk";
import QRCode from "react-qr-code";
import CollectionData from "../assets/CollectionData";
import Loader, { LoaderSizes } from "../elements/Loader";
import Card from '../elements/Card';
import Flex from '../elements/Flex';
import Text, { TextTypesEnum } from "../elements/Text";
import AppState from "../recoil/app.recoil";
import PageLayout from "../components/PageLayout";

const Container = styled.div`
  top: 0px;
  display: flex;
  height: 500px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const QRCodeContainer = styled.div`
  height: 300px;
  width: 300px;
  background-color: ${Colors.White};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 300px;
  width: 300px;
  background-color: ${Colors.White};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type AuthenticateProps = {};

const Authenticate: React.FC<AuthenticateProps> = ({}) => {
  const [authData, setAuthData] = React.useState<AuthorizationData | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const [collectionId] = useRecoilState(AppState.collectionId);

  const collection = CollectionData.find((collection) => {
    return collection.collectionId === collectionId;
  })


  const bedrock = useBedrock();

  const {
    core: { createAuthorizationNonceLink },
  } = bedrock;

  const { result, loading } = useCreateNonceLink(createAuthorizationNonceLink, {
    params: {
      gate: {
        collectionId: collection?.collectionId ?? "",
      },
    },
  });

  useNonceSocket<AuthorizationData>({
    bedrock,
    nonce: result?.nonce ?? "",
    onChange: (data: AuthorizationData) => {
      setAuthData(data);
    },
    onError: setError,
  });

  console.log(authData);

  return (
    <PageLayout>
      <Text type={TextTypesEnum.Bold24} color={Colors.White}>
        Verify {collection?.name}
      </Text>
      <Container>
        <Flex align="center" width="900px" justify="space-between">
          <Card collection={collection} margin="0" />
          <Flex direction="column" justify="center" align="center">
            <Loader
              size={LoaderSizes.Large}
              color={
                authData?.status === TransactionStatuses.Scanned
                  ? Colors.Green500
                  : Colors.White
              }
            />
            <Text
              type={TextTypesEnum.Medium24}
              color={Colors.White}
              margin="16px 0 0"
            >
              {authData?.status === TransactionStatuses.Scanned
                ? "Confirming..."
                : "Waiting for scan"}
            </Text>
          </Flex>
          <Flex>
            <Flex direction="column" height="100%" align="center">
              {authData?.gate?.image ? (
                <Image src={authData?.gate?.image} />
              ) : (
                <QRCodeContainer>
                  <QRCode value={result?.link ?? ""} size={256} />
                </QRCodeContainer>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </PageLayout>
  );
};

export default Authenticate;
