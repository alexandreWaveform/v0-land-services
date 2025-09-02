import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Button, TextInput, HelperText, Text } from "react-native-paper";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { theme, colors } from "@/src/assets/theme/colors";
import i18n from "@/src/assets/localization/i18n";
import { styles as authStyles } from "@/src/assets/styles/authStylesheet";
import { login } from "@services/authService";

const LoginScreen = () => {
  useEffect(() => {
    console.log("Login Screen mounted");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoggingIn, setisLoggingIn] = useState<boolean>(false);
  const router = useRouter();
  // Create refs for the inputs
  const passwordInputRef = useRef<any>(null);

  const checkFormValidity = () => {
    // Check if both email and password are valid
    const isEmailValid = !emailError && email.trim() !== "";
    const isPasswordValid = !passwordError && password.trim() !== "";
    setFormValid(isEmailValid && isPasswordValid);
  };

  const fieldChangeHandler = (formField: string, enteredValue: string) => {
    switch (formField) {
      case "email":
        setEmail(enteredValue);
        setEmailError(null);
        break;
      case "password":
        setPassword(enteredValue);
        setPasswordError(null);
        break;
    }
    checkFormValidity();
  };

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError(i18n.t("mandatory_email"));
      setFormValid(false);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError(i18n.t("valid_email"));
      setFormValid(false);
      return false;
    }
    setEmailError(null);
    checkFormValidity();
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError(i18n.t("mandatory_password"));
      setFormValid(false);
      return false;
    }
    setPasswordError(null);
    checkFormValidity();
    return true;
  };

  const userLogin = async () => {
    setisLoggingIn(true);
    try {
      console.log("Pressed Login");
      const response = await login(email, password);
      console.log(response);
      router.replace("/client/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
    setisLoggingIn(false);
  };

  const supplierLogin = async () => {
    setisLoggingIn(true);
    try {
      console.log("Pressed Login");
      const response = await login(email, password);
      console.log(response);
      router.replace("/supplier/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
    setisLoggingIn(false);
  };

  return (
    <View style={authStyles.authContainer}>
      <View style={authStyles.logoContainer}>
        <Image
          source={require("@images/landservices-logo.png")}
          style={{ width: 250, height: 250 }}
        />
      </View>

      {/* Login Form */}
      <View>
        <TextInput
          label={i18n.t("email")}
          value={email}
          onChangeText={fieldChangeHandler.bind(this, "email")}
          onBlur={() => validateEmail(email)}
          error={!!emailError}
          style={authStyles.textInput}
          mode="flat"
          underlineColor="transparent"
          keyboardType="email-address"
          autoCapitalize="none"
          right={
            <TextInput.Icon icon="email-outline" color={theme.colors.primary} />
          }
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <HelperText type="error" visible={!!emailError}>
          {emailError}
        </HelperText>
        <TextInput
          ref={passwordInputRef}
          label={i18n.t("password")}
          value={password}
          onChangeText={fieldChangeHandler.bind(this, "password")}
          onBlur={() => validatePassword(password)}
          secureTextEntry={!passwordVisible}
          style={authStyles.textInput}
          mode="flat"
          underlineColor="transparent"
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              color={theme.colors.primary}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          theme={{ colors: { background: colors.white } }}
          returnKeyType="done"
        />
        <HelperText type="error" visible={!!passwordError}>
          {passwordError}
        </HelperText>

        {/* Recover Password Link */}
        <View style={{ alignItems: "flex-end", marginBottom: 16 }}>
          <Pressable onPress={() => router.push("/password-recover")}>
            <Text style={styles.recoverText}>{i18n.t("recover_password")}</Text>
          </Pressable>
        </View>

        {/* TODO: Buttons Remove button container*/}
        <View style={authStyles.buttonContainer}>
          <Button
            style={authStyles.buttonContained}
            loading={isLoggingIn}
            mode="contained"
            contentStyle={authStyles.buttonRipple}
            //TODO: disabled={!formValid || isLoggingIn}
            onPress={userLogin}
          >
            {i18n.t("login")}
          </Button>
          <Button
            style={authStyles.buttonContained}
            loading={isLoggingIn}
            mode="contained"
            contentStyle={authStyles.buttonRipple}
            //TODO:  disabled={!formValid || isLoggingIn}
            onPress={supplierLogin}
          >
            {i18n.t("supplier")}
          </Button>
        </View>
        <Button
          style={authStyles.buttonOutlined}
          mode="outlined"
          contentStyle={authStyles.buttonRipple}
          onPress={() => router.push("/registration")}
        >
          {i18n.t("register")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recoverContainer: {
    alignItems: "flex-end"
  },
  recoverText: {
    color: theme.colors.accent,
    fontSize: 16,
  },
});

export default LoginScreen;
