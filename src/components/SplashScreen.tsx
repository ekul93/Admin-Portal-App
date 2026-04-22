import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Text } from "react-native-paper";

export default function SplashScreen() {
    const opacity = useRef( new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
        }).start();
    }, []);

    return(
        <View style={styles.container}>
            <Animated.View style={{opacity}}>
                <Text variant="displayMedium" style={styles.title}>Admin Portal</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>Loading...</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center'},
    title: { color: '#fff', fontWeight: 'bold', textAlign: 'center'},
    subtitle: { color: '#aaa', marginTop: 0, textAlign: 'center'},
});