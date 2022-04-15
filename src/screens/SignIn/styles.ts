import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    `

export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    `

export const TitleWrapper = styled.View`
    align-items: center;
    `

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.medium};
    
    font-size: ${RFValue(30)}px;
    
    text-align: center;

    margin-top: 45px;

`

export const SignInTitle = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};

    font-size: ${RFValue(16)}px;

    text-align: center;
    
    margin: 80px 0 67px;
    `
export const Footer = styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({ theme }) => theme.colors.secondary};
`

export const FooterWrapper = styled.View`
    width: 100%;
    margin-top: ${(RFPercentage(-4))}px;
    padding: 0 32px;
`