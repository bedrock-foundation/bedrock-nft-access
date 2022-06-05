import React from 'react';
import styled from '@emotion/styled';

type FlexProps = {
    children?: any;
    height?: string;
    width?: string;
    direction?: string;
    justify?: string;
    align?: string;
    padding?: string;
    margin?: string;
    flex?: string;
    overflow?: string;
    id?: string;
    onClick?: () => void | null;
    tip?: string;
    tipPlace?: string;
};

const Container = styled.div<FlexProps>`
    display: flex;
    position: relative;
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    flex: ${(props) => props.flex};
    overflow: ${(props) => props.overflow};

    &:hover {
        cursor: ${(props) => (props.onClick ? 'pointer' : null)};
    }
`;

export const Spacer = styled.div`
    width: 16px;
`;

export const CustomSpacer = styled.div<{ height?: string; width?: string }>`
    height: ${(props) => props.height};
    width: ${(props) => props.width};
`;

const Flex: React.FC<FlexProps> = ({
    children,
    height = '',
    width = null,
    direction = 'row',
    justify = '',
    align = '',
    padding = '',
    margin = '',
    flex = '',
    overflow = '',
    id = '',
    onClick = null,
    tip,
    tipPlace,
}) => (
    <Container
        id={id}
        height={height}
        width={width as any}
        direction={direction}
        justify={justify}
        align={align}
        padding={padding}
        margin={margin}
        flex={flex}
        overflow={overflow}
        onClick={onClick ? () => onClick() : null as any}
        data-tip={tip}
        data-place={tipPlace}
    >
        {children}
    </Container>
);

export default Flex;
