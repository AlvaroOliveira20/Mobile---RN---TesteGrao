import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack'
import  HomeScreen  from '../screens/home';
import  PersonagensScreen  from '../screens/personagens';



const Stack = createStackNavigator();

export const NavegacaoPrincipal = () => (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false, cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="personagens" component={PersonagensScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

    