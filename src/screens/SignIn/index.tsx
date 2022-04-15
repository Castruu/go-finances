import React, { useState } from 'react';

import Google from '../../assets/google.svg'
import Apple from '../../assets/apple.svg'
import Logo from '../../assets/logo.svg'

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper,
} from './styles';

import SocialSignInButton from '../../components/SocialSignInButton';

import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';


const SignIn = () => {


    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithApple } = useAuth()
    const theme = useTheme()

    async function handeSignInWithGoogle() {
        try {
            setIsLoading(true)
            return await signInWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível logar com a conta Google!')
            setIsLoading(false)
        }
    }
    async function handleSignInWithApple() {
        try {
            setIsLoading(true)
            return await signInWithApple()
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível logar com a conta Apple!')
            setIsLoading(false)
        }
    }

    return <Container>
        <Header>
            <TitleWrapper>
                <Logo
                    height={RFValue(68)}
                    width={RFValue(120)}
                />
                <Title>
                    Controle suas{'\n'}finanças de forma{'\n'}muito simples
                </Title>
            </TitleWrapper>

            <SignInTitle>
                Faça seu login com{'\n'}uma das contas abaixo
            </SignInTitle>
        </Header>

        <Footer>
            <FooterWrapper>
                <SocialSignInButton
                    title='Entrar com Google'
                    svg={Google}
                    onPress={handeSignInWithGoogle}
                />
                {Platform.OS === 'ios' &&
                    <SocialSignInButton
                        title='Entrar com Apple'
                        svg={Apple}
                        onPress={handleSignInWithApple}
                    />}
            </FooterWrapper>
        </Footer>

        {isLoading && <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }} />}

    </Container>;
}

export default SignIn;