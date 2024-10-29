import { Stack } from "expo-router";


export default function SignupLayout() {
    return (
        <Stack initialRouteName='signupWithEmail'screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen name="signupWithEmail"/>
        <Stack.Screen name="onBoarding"/>
        </Stack>
        
    );
}