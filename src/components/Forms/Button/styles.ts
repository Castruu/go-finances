import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Container = styled(RectButton)`
    height: ${RFValue(56)}px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    background-color: ${({theme}) => theme.colors.secondary};

`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    
    color: ${({theme}) => theme.colors.shape}

`