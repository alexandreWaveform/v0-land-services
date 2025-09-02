import { colors, theme } from "@/src/assets/theme/colors";
import { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  TouchableOpacity
} from "react-native";
import { Button, TextInput, HelperText, Text } from "react-native-paper";
import { styles as authStyles } from "@/src/assets/styles/authStylesheet";
import i18n from "@/src/assets/localization/i18n";
import { useRouter } from "expo-router";
import { register } from "@services/authService";
import { User, UserType } from "@/src/models/User";
import UserTypeSelector from "@/src/components/(auth)/user-type-selector";
import { MaterialIcons } from "@expo/vector-icons";

const RegistrationScreen = () => {
    useEffect(() => {
        console.log("Registration Screen mounted");
      }, []);
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<UserType | null>(null);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    // validation code consts
    const inputRefs = useRef<(RNTextInput | null)[]>([null, null, null, null]);
    const [code, setCode] = useState<string[]>(["", "", "", ""]);
    const [isCodeValid, setCodeValid] = useState<boolean>(false);
    const [isValidatingCode, setIsValidatingCode] = useState<boolean>(false);
    const [isCodeError, setIsCodeError] = useState<boolean>(false);

    const [formData, setFormData] = useState<User>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userType: undefined
    });

    useEffect(() => {
        if (formData.firstName != "" &&
            formData.lastName !== "" &&
            formData.email !== "" &&
            formData.password !== "" &&
            firstNameError === "" &&
            lastNameError === "" &&
            emailError === "" &&
            passwordError === "")
        {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [firstNameError, lastNameError, emailError, passwordError, formData]);

    const handleChange = (key: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleValidation = (key: keyof typeof formData, value: string) => {
        // Validate firstName
        if (key === "firstName") {
            if (value === ""){
                setFirstNameError(i18n.t("mandatory_first_name"));
            } else {
                setFirstNameError("");
            }
        }
        // Validate lastName
        if (key === "lastName") {
            if (value === ""){
                setLastNameError(i18n.t("mandatory_last_name"));
            } else {
                setLastNameError("");
            }
        }
        // Validate email
        if (key === "email") {
            if (value === ""){
                setEmailError(i18n.t("mandatory_email"));
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                setEmailError(i18n.t("valid_email"));
            } else {
                setEmailError("");
            }
        }
        // Validate password
        if (key === "password") {
            if (value === ""){
                setPasswordError(i18n.t("mandatory_password"));
            } else {
                setPasswordError("");
            }
        }
    }

    const handleUserRegistration = async () => {
        setIsRegistering(true);
        try {
            const response = await register(formData);
            console.log(response);
            // handle final form submission
            console.log("User Registered:", formData);
            setStep(2);
          } catch (error) {
            console.error("Registration failed:", error);
          }
        setIsRegistering(false);
    };

    // Email verification Code
    // Focus the first input when component mounts
    useEffect(() => {
        setTimeout(() => {
        inputRefs.current[0]?.focus()
        }, 100)
    }, []);

    useEffect (() => {
        const fullCode = code.join("");
        if (fullCode.length === 4) {
            setCodeValid(true);
        } else {
            setCodeValid(false);
        }

    }, [code]);

    const handleCodeChange = (text: string, index: number) => {
        // Only allow numbers
        if (!/^\d*$/.test(text)) return

        const newCode = [...code]
        newCode[index] = text

        setCode(newCode)
        setIsCodeError(false)

        // Auto-focus to next input if current input is filled
        if (text.length === 1 && index < 3) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        // Move to previous input on backspace if current input is empty
        if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
        }
    }

    const handleResendCode = async () => {
        try {
            console.log("Requesting new verification code")
            // Here you would call your service to resend the code
            // await resendVerificationCode()

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            console.log("New verification code sent")
            // Reset inputs
            setCode(["", "", "", ""])
            setIsCodeError(false)
            inputRefs.current[0]?.focus()
        } catch (error) {
            console.error("Failed to resend code:", error)
        }
    }

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
            router.back();
            // If successful, you would navigate to the next screen
            // if (response.success) {
            //   router.push("/password-reset")
            // }
        } catch (error) {
            console.error("Verification failed:", error);
            setIsCodeError(true);
        }
        setIsValidatingCode(false);
    }


    const renderStep = () => {
        switch (step) {
            case 1:
            return (
                <>
                    <Text style={authStyles.authSubTitle}>
                        {i18n.t("registration_data")}
                    </Text>
                    {/* First Name Input */}
                    <TextInput
                        label={i18n.t("first_name")}
                        value={formData.firstName}
                        onChangeText={(text) => handleChange("firstName", text)}
                        onBlur={() => handleValidation("firstName", formData.firstName)}
                        error={!!firstNameError}
                        style={authStyles.textInput}
                        mode="flat"
                        underlineColor="transparent"
                        right={
                        <TextInput.Icon
                            icon="account-outline"
                            color={theme.colors.primary}
                        />
                        }
                        theme={{ colors: { background: colors.white } }}
                        returnKeyType="next"
                    />
                    <HelperText type="error" visible={!!firstNameError}>
                        {firstNameError}
                    </HelperText>
                    {/* Last Name Input */}
                    <TextInput
                        label={i18n.t("last_name")}
                        value={formData.lastName}
                        onChangeText={(text) => handleChange("lastName", text)}
                        onBlur={() => handleValidation("lastName", formData.lastName)}
                        error={!!lastNameError}
                        style={authStyles.textInput}
                        mode="flat"
                        underlineColor="transparent"
                        right={
                        <TextInput.Icon
                            icon="account-outline"
                            color={theme.colors.primary}
                        />
                        }
                        theme={{ colors: { background: colors.white } }}
                        returnKeyType="next"
                    />
                    <HelperText type="error" visible={!!lastNameError}>
                        {lastNameError}
                    </HelperText>
                    {/* Email Input */}
                    <TextInput
                        label={i18n.t("email")}
                        value={formData.email}
                        onChangeText={(text) => handleChange("email", text)}
                        onBlur={() => handleValidation("email", formData.email)}
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
                    {/* Password Input */}
                    <TextInput
                        label={i18n.t("password")}
                        value={formData.password}
                        onChangeText={(text) => handleChange("password", text)}
                        onBlur={() => handleValidation("password", formData.password)}
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
                    {/* TODO : Insert Password Comparison Field to validate any typo error */}
                    {/* User Type Component Selector */}
                    <UserTypeSelector
                        selectedType={selectedType}
                        onSelectType={(type) => {
                            setSelectedType(type);
                            console.log(`Selected user type: ${type}`);
                        }}
                    />
                </>
            );
            case 2:
            return (
                <>
                    <Text style={authStyles.authSubTitle}>
                        {i18n.t("email_verification")}
                    </Text>
                    <Text style={authStyles.authInstructions}>
                        {i18n.t("verification_code_sent")}
                    </Text>
                    {/* Code Input Fields */}
                    <View style={authStyles.codeContainer}>
                        {[0, 1, 2, 3].map((index) => (
                            <View key={index} style={authStyles.codeInputWrapper}>
                                <RNTextInput
                                    ref={(ref) => {(inputRefs.current[index] = ref)}}
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
            {/* ScrollView wrapping the entire screen content */}
            <ScrollView
                contentContainerStyle={authStyles.scrollContainer}
                bounces={false}
                >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={authStyles.keyboardView}
                    >
                    <Text style={[authStyles.authTitle, { marginBottom: 8 }]}>
                    {i18n.t("user_registration")}
                    </Text>
                    {renderStep()}
                    <View style={authStyles.buttonContainer}>
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
                                    onPress={handleUserRegistration}
                                    style={[authStyles.buttonContained, { flex: 1 }]}
                                    mode="contained"
                                    disabled={!formValid || isRegistering}
                                    loading={isRegistering}
                                    contentStyle={authStyles.buttonRipple}
                                >
                                    {i18n.t("register")}
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
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
  );
};

export default RegistrationScreen;
