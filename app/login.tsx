import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useAuth } from "../src/context/AuthContext";

export default function LoginScreen() {
  const { login, isLoggedIn, error, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => login(username, password);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(home)");
    }
  }, [isLoggedIn]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/digital-wallet.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text variant="displaySmall" style={styles.title}>
          Admin Portal
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Sign in to continue
        </Text>
        {/* Username */}
        <TextInput
          label="username"
          mode="outlined"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
          outlineColor="#444"
          activeOutlineColor="#7c6af7"
          textColor="#fff"
          theme={{ colors: { onSurfaceVariant: "#aaa" } }}
        />
        {/* Password */}
        <TextInput
          label="password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPass}
          autoCapitalize="none"
          left={<TextInput.Icon icon="account" />}
          right={
            <TextInput.Icon
              icon={showPass ? "eye-off" : "eye"}
              onPress={() => setShowPass((p) => !p)}
            />
          }
          style={styles.input}
          outlineColor="#444"
          activeOutlineColor="#7c6af7"
          textColor="#fff"
          theme={{ colors: { onSurfaceVariant: "#aaa" } }}
        />
        {/* Error message */}
        <HelperText type="error" visible={!!error} style={styles.error}>
          {error}
        </HelperText>
        {/* Submit */}
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading || !username || !password}
          style={styles.button}
          contentStyle={styles.buttonContent}
          buttonColor="#7c6af7"
        >
          Sign In
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
  },
  imageContainer: {
    backgroundColor: "transparent",
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 24,
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    alignSelf: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    alignSelf: "center",
    color: "#aaa",
    marginBottom: 32,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#16213e",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: 4,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  hint: {
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});
