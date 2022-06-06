import React from "react";
import styled from "@emotion/styled";
import Colors from "../styles/Colors";
import {
  useBedrock,
  useCreateNonceLink,
  useNonceSocket,
  AuthorizationData,
  TransactionStatuses,
} from "@bedrock-foundation/react-sdk";
import QRCode from "react-qr-code";
import Loader, { LoaderSizes } from "../elements/Loader";
import Card from '../elements/Card';
import Flex from '../elements/Flex';
import Text, { TextTypesEnum } from "../elements/Text";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
  height: 300px;
  width: 300px;
  border-radius: 300px;
`;

type AuthenticateProps = {
  collection: any;
};

const Authenticate: React.FC<AuthenticateProps> = ({
  collection,
}) => {
  const [authData, setAuthData] = React.useState<AuthorizationData | null>(null);
  const [error, setError] = React.useState<Error | null>(null);


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

  return (
    <Container>
      <React.Fragment>
        <Card collection={collection} />
        {result?.link && !loading ? (
          <React.Fragment>
            {!authData && <QRCode value={result?.link ?? ""} size={256} />}
            <Flex direction="column" height="100%" align="center">
              <Text type={TextTypesEnum.Bold24} color={Colors.White}>
                Verify {collection.name}
              </Text>
              {(() => {
                if (!authData) {
                  return (
                    <React.Fragment>
                      <Text type={TextTypesEnum.Bold24} color={Colors.White}>
                        Waiting for scan...
                      </Text>
                      <Loader size={LoaderSizes.Medium} color={Colors.White} />
                    </React.Fragment>
                  );
                }

                if (authData?.status === TransactionStatuses.Scanned) {
                  return (
                    <React.Fragment>
                      <Text type={TextTypesEnum.Bold24} color={Colors.White}>
                        Scanned by {authData?.wallet}
                      </Text>
                      <Text type={TextTypesEnum.Bold24} color={Colors.White}>
                        Waiting for confirmation
                      </Text>
                      <Image src={authData?.gate?.image ?? ""} />
                      <Loader size={LoaderSizes.Medium} color={Colors.White} />
                    </React.Fragment>
                  );
                }

                if (authData?.status === TransactionStatuses.Confirmed) {
                  return (
                    <React.Fragment>
                      <Text type={TextTypesEnum.Bold24} color={Colors.White}>
                        Confirmed!
                      </Text>
                      <Image src={authData?.gate?.image ?? ""} />
                    </React.Fragment>
                  );
                }
              })()}
            </Flex>
          </React.Fragment>
        ) : (
          <Loader size={LoaderSizes.Medium} color={Colors.White} />
        )}
      </React.Fragment>
    </Container>
  );
};

export default Authenticate;
