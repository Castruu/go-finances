import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { Container } from './styles';

const LoadIndicator = () => {
    const theme = useTheme()
    return <Container>
        <ActivityIndicator
            color={theme.colors.primary}
            size='large'
        />
    </Container>;
}

export default LoadIndicator;