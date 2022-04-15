import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session'

interface AuthProviderProps {
    children: ReactNode
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    isLoadingUser: boolean;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>
}

interface AuthenticationResponse {
    type: string;
    params: {
        access_token: string;
    }
}

import { CLIENT_ID, REDIRECT_URI } from '@env';


const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    const userStorageKey = '@gofinances:user'

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthenticationResponse;


            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json()
                const userLogged = {
                    id: userInfo.id,
                    name:  userInfo.given_name,
                    email: userInfo.email,
                    photo: userInfo.picture
                }
                setUser(userLogged)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
            
        } catch (error: any) {
            throw new Error(error)
        }
    }
    
    async function signInWithApple() {
        try {
            const credentials = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            })
            
            if (credentials) {
                const name = credentials.fullName!.givenName!;
                const photo = `https://ui-avatars.com/api/?name=${name}&length=1`

                const userLogged = {
                    id: String(credentials.user),
                    name,
                    email: credentials.email!,
                    photo
                }
                setUser(userLogged)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function signOut() {
        setUser({} as User)
        await AsyncStorage.removeItem(userStorageKey)
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const data = await AsyncStorage.getItem(userStorageKey);
            if(data) {
                const loggedUser = JSON.parse(data) as User
                setUser(loggedUser);
            }
            setIsLoadingUser(false)
        }
        loadUserStorageData()
    }, [])

    return <AuthContext.Provider value={{
        user,
        isLoadingUser,
        signInWithGoogle,
        signInWithApple, 
        signOut
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }