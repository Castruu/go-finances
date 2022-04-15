import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import styled from "styled-components/native";

export const Container = styled(RectButton)`
    height: ${RFValue(56)}px;

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    align-items: center;
    flex-direction: row;

    margin-bottom: 16px;
`;

export const LogoContainer = styled.View`
    height: 100%;
    
    border-color: ${({ theme }) => theme.colors.background};
    border-right-width: 1px;

    padding: 16px; 
    
    justify-content: center;
    align-items: center;
`


export const Title = styled.Text`
    flex: 1;
    text-align: center;
    
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    
    color: ${({ theme }) => theme.colors.text_dark};
`