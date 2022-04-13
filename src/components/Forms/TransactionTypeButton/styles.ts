import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled, {css} from "styled-components/native";
import { TouchableOpacity } from 'react-native';

interface IconProps {
    type: 'up' | 'down';
}

interface ContainerProps extends IconProps {
    isActive: boolean;
}


export const Container = styled.View<ContainerProps>`
    width: 48%;

    border-radius: 5px;
    border: ${({theme, isActive}) => isActive ? 'none' : `1.5px solid ${theme.colors.text}`};

    ${({isActive}) => isActive ? css`
        border: none;
    ` : ''}

    background-color: ${({theme, type, isActive}) => {
        if(!isActive) return theme.colors.background
        return type === 'up' ? theme.colors.success_light : theme.colors.attention_light
    }};
`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px;

`

export const Icon = styled(Feather)<IconProps>`
    color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attention};
    font-size: ${RFValue(24)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.text_dark};
    margin-left: 14px;
`