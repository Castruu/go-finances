import { Feather } from '@expo/vector-icons';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler'

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`


export const Category = styled(RectButton)<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;

    flex-direction: row;
    align-items: center;

    background-color: ${({theme, isActive}) => 
        isActive ? theme.colors.attention_light : theme.colors.background
    };
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;

    color: ${({theme}) => theme.colors.text_dark};
    
    margin-right: 16px;
`;

export const Name = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    
    color: ${({theme}) => theme.colors.text_dark};
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.text};
`

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`