import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Container, LogoContainer, Title } from './styles';

interface Props extends RectButtonProps {
    svg: React.FC<SvgProps>;
    title: string;
}

const SocialSignInButton = ({ svg: Svg, title, ...rest }: Props) => {
    return <Container {...rest}>
        <LogoContainer>
            <Svg />
        </LogoContainer>
            <Title>
                {title}
            </Title>
    </Container>
}

export default SocialSignInButton;