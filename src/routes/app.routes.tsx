import React from "react";
import {MaterialIcons} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import Resume from "../screens/Resume";

export type AppRoutesParamList = {
    Listagem: undefined;
    Cadastrar: undefined;
    Resumo: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>()

export const AppRoutes = () => {
    const theme = useTheme()
    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    paddingBottom: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen
                name='Listagem'
                component={Dashboard}
                options={{
                    tabBarIcon: ({size, color}) => {
                        return <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    }
                }}
            />
            <Screen
                name='Cadastrar'
                component={Register}
                options={{
                    tabBarIcon: ({size, color}) => {
                        return <MaterialIcons
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    }
                }}
                />
            <Screen
                name='Resumo'
                component={Resume}
                options={{
                    tabBarIcon: ({size, color}) => {
                        return <MaterialIcons
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    }
                }}
            />
        </Navigator>
    )
}