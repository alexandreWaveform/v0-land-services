import { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
} from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { styles as authStyles } from "@/src/assets/styles/authStylesheet";
import i18n from "@/src/assets/localization/i18n";
import { colors, theme } from "@/src/assets/theme/colors";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

const PasswordRecoverScreen = () => {
  useEffect(() => {
    console.log("Password Recover mounted");
  }, []);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isValidatingEmail, setIsValidatingEmail] = useState<boolean>(false);
  const router = useRouter();
  // validation code consts
  const inputRefs = useRef<(RNTextInput | null)[]>([null, null, null, null]);
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [isCodeValid, setCodeValid] = useState<boolean>(false);
  const [isValidatingCode, setIsValidatingCode] = useState<boolean>(false);
  const [isCodeError, setIsCodeError] = useState<boolean>(false);
  // validation password consts
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<
    string | null
  >(null);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const handleEmailChange = (enteredValue: string) => {
    setEmail(enteredValue);
  };

  const handleEmailValidation = () => {
    console.log(email);
    // Validate email
    if (email === "") {
      setEmailError(i18n.t("mandatory_email"));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(i18n.t("valid_email"));
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const submitEmail = () => {
    setStep(2);
  };

  // Email verification Code
  // Focus the first input when component mounts
  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      setCodeValid(true);
    } else {
      setCodeValid(false);
    }
  }, [code]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;

    setCode(newCode);
    setIsCodeError(false);

    // Auto-focus to next input if current input is filled
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    try {
      console.log("Requesting new verification code");
      // Here you would call your service to resend the code
      // await resendVerificationCode()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("New verification code sent");
      // Reset inputs
      setCode(["", "", "", ""]);
      setIsCodeError(false);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Failed to resend code:", error);
    }
  };

  const handleVerifyCode = async () => {
    setIsValidatingCode(true);
    try {
      const fullCode = code.join("");
      console.log("Verifying code:", fullCode);

      // Here you would call your verification service
      // const response = await verifyCode(fullCode)

      // Simulate API call and error for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, always show error
      // In production, you would check the response
      setIsCodeError(false);
      setStep(3);
      // If successful, you would navigate to the next screen
      // if (response.success) {
      //   router.push("/password-reset")
      // }
    } catch (error) {
      console.error("Verification failed:", error);
      setIsCodeError(true);
    }
    setIsValidatingCode(false);
  };

  // Password validation
  useEffect(() => {
    if (password != "" && passwordConfirmation != "") {
      if (password === passwordConfirmation) {
        console.log("passwords identical");
        setIsPasswordValid(true);
      }
    }
  }, [password, passwordConfirmation]);

  const handleChange = (field: string, value: string) => {
    if (field === "password") {
      setPassword(value);
      setPasswordError("");
    }
    if (field === "passwordConfirmation") {
      setPasswordConfirmation(value);
      setPasswordConfirmationError("");
    }
  };

  const handlePasswordChange = () => {
    router.back();
  };

  const handleValidation = (field: string, value: string) => {
    if (field === "password") {
      if (value === "") {
        setPasswordError(i18n.t("mandatory_password"));
      }
    }
    if (field === "passwordConfirmation") {
      if (value === "") {
        setPasswordConfirmationError(i18n.t("mandatory_password"));
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
            <>
                <Text style={[authStyles.authTitle, { marginBottom: 8 }]}>
                    {i18n.t("recover_password")}
                </Text>
                <Text style={authStyles.authSubTitle}>
                    {i18n.t("recover_password_text")}
                </Text>
                {/* Email Input */}
                <TextInput
                    label={i18n.t("email")}
                    value={email}
                    onChangeText={(text) => handleEmailChange(text)}
                    onBlur={() => handleEmailValidation()}
                    error={!!emailError}
                    style={authStyles.textInput}
                    mode="flat"
                    underlineColor="transparent"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    right={
                        <TextInput.Icon
                        icon="email-outline"
                        color={theme.colors.primary}
                        />
                    }
                    theme={{ colors: { background: colors.white } }}
                    returnKeyType="next"
                />
                <HelperText type="error" visible={!!emailError}>
                    {emailError}
                </HelperText>
            </>
        );
      case 2:
        return (
            <>
                <Text style={[authStyles.authTitle, { marginBottom: 8 }]}>
                    {i18n.t("email_verification")}
                </Text>
                <Text style={authStyles.authSubTitle}>
                    {i18n.t("verification_code_sent")}
                </Text>
                {/* Code Input Fields */}
                <View style={authStyles.codeContainer}>
                    {[0, 1, 2, 3].map((index) => (
                    <View key={index} style={authStyles.codeInputWrapper}>
                        <RNTextInput
                            ref={(ref) => {
                                inputRefs.current[index] = ref;
                            }}
                            style={authStyles.codeInput}
                            value={code[index]}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    </View>
                    ))}
                </View>
                {/* Error Message */}
                {isCodeError && (
                    <Text style={authStyles.errorText}>{i18n.t("wrong_code")}</Text>
                )}
                {/* Resend Code Link */}
                <TouchableOpacity onPress={handleResendCode}>
                    <Text style={authStyles.resendText}>
                    {i18n.t("send_new_code")}
                    </Text>
                </TouchableOpacity>
            </>
        );
      case 3:
        return (
            <>
                <Text style={[authStyles.authTitle, { marginBottom: 8 }]}>
                    {i18n.t("reset_password")}
                </Text>
                <Text style={authStyles.authSubTitle}>
                    {i18n.t("reset_password_text")}
                </Text>
                {/* Password Input */}
                <TextInput
                    label={i18n.t("password")}
                    value={password}
                    onChangeText={(text) => handleChange("password", text)}
                    onBlur={() => handleValidation("password", password)}
                    error={!!passwordError}
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
                {/* Confirm Password Input */}
                <TextInput
                    label={i18n.t("password")}
                    value={passwordConfirmation}
                    onChangeText={(text) =>
                        handleChange("passwordConfirmation", text)
                    }
                    onBlur={() =>
                        handleValidation("passwordConfirmation", passwordConfirmation)
                    }
                    error={!!passwordConfirmationError}
                    secureTextEntry={!passwordConfirmationVisible}
                    style={authStyles.textInput}
                    mode="flat"
                    underlineColor="transparent"
                    autoCapitalize="none"
                    right={
                        <TextInput.Icon
                        icon={passwordConfirmationVisible ? "eye-off" : "eye"}
                        color={theme.colors.primary}
                        onPress={() =>
                            setPasswordConfirmationVisible(!passwordConfirmationVisible)
                        }
                        />
                    }
                    theme={{ colors: { background: colors.white } }}
                    returnKeyType="done"
                />
                <HelperText type="error" visible={!!passwordConfirmationError}>
                    {passwordConfirmationError}
                </HelperText>
            </>
        );
      default:
        return null;
    }
  };
  return (
    <View style={authStyles.authContainer}>
        <TouchableOpacity
            onPress={() => router.replace("/login")}
        >
            <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {renderStep()}
        <View style={[authStyles.buttonContainer, { marginTop: -16}]}>
            {step == 1 && (
            <>
                <Button
                onPress={() => router.back()}
                style={[authStyles.buttonContained, { flex: 1 }]}
                mode="outlined"
                contentStyle={authStyles.buttonRipple}
                >
                {i18n.t("cancel")}
                </Button>
                <Button
                onPress={submitEmail}
                style={[authStyles.buttonContained, { flex: 1 }]}
                mode="contained"
                disabled={!isEmailValid || isValidatingEmail}
                loading={isValidatingEmail}
                contentStyle={authStyles.buttonRipple}
                >
                {i18n.t("send")}
                </Button>
            </>
            )}
            {step == 2 && (
            <>
                <Button
                onPress={() => router.back()}
                style={[authStyles.buttonContained, { flex: 1 }]}
                mode="outlined"
                contentStyle={authStyles.buttonRipple}
                >
                {i18n.t("cancel")}
                </Button>
                <Button
                // Validate secret code
                onPress={handleVerifyCode}
                style={[authStyles.buttonContained, { flex: 1 }]}
                disabled={!isCodeValid || isValidatingCode}
                loading={isValidatingCode}
                mode="contained"
                contentStyle={authStyles.buttonRipple}
                >
                {i18n.t("validate")}
                </Button>
            </>
            )}
            {step == 3 && (
            <>
                <Button
                onPress={() => router.back()}
                style={[authStyles.buttonContained, { flex: 1 }]}
                mode="outlined"
                contentStyle={authStyles.buttonRipple}
                >
                {i18n.t("cancel")}
                </Button>
                <Button
                // Validate secret code
                onPress={handlePasswordChange}
                style={[authStyles.buttonContained, { flex: 1 }]}
                disabled={!isPasswordValid || isChangingPassword}
                loading={isChangingPassword}
                mode="contained"
                contentStyle={authStyles.buttonRipple}
                >
                {i18n.t("change")}
                </Button>
            </>
            )}
        </View>
    </View>
  );
};

export default PasswordRecoverScreen;
