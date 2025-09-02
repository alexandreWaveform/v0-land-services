import { StyleSheet, Platform } from "react-native";
import { colors } from "@/src/assets/theme/colors";

export const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: colors.textInputBackgroundColor
  },
  buttonContained: {
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonOutlined: {
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    color: colors.primary700,
  },
  authSubTitle: {
    //fontSize: 24,
    //fontWeight: "bold",
    //marginTop: 30,
    marginBottom: 40,
    color: colors.primary700,
  },
  authInstructions: {
    //fontSize: 16,
    marginBottom: 30,
    color: colors.primary700,
  },
  keyboardView: {
    flex: 1,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 24
  },
  codeInputWrapper: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white
  },
  codeInput: {
    textAlign: "center",
    fontSize: 20,
    color: colors.primary500,
    ...Platform.select({
        android: {
            paddingBottom: 10,
            includeFontPadding: false,
            //lineHeight: 20, // Match to fontSize
        }
    })
  },
  errorText: {
    color: colors.red,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  resendText: {
    color: colors.secondary500,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20
  },
  scrollContainer: {
    flexGrow: 1,
  },  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16
  },
  buttonRipple: {
    height: 50,
  }
});
