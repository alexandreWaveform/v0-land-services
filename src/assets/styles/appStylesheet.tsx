import { StyleSheet, Platform } from "react-native";
import { colors } from "@/src/assets/theme/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16
  },
  homeHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    position: "relative",
  },
  homeTitle:{
    fontSize: 24,
    fontWeight: "bold",
  },
  homeTopCard: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 30
  },
  homeTopCardHeaderText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16
  },
  homeTopCardTitleText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  homeTopCardInnerContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  cardInnerIcon: {
    width: 30,
    height: 30,
    tintColor: colors.white
  },
  homeClientPrimaryBackground: {
    backgroundColor: colors.primary500
  },
  homeSupplierPrimaryBackground: {
    backgroundColor: colors.secondary500
  },
  homeCardRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  homeCard: {
    borderRadius: 15,
    padding: 20,
    width: "48%",
    aspectRatio: 1.5,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  homeBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors.red,
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  homeBadgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
    homeCardButtonIcon: {
    width: 42,
    height: 42,
    tintColor: colors.white,
    marginBottom: 8
  },
  homeCardTextContainer: {
    position: "absolute",
    bottom: 14
  },
  homeCardText: {
    color: colors.white,
    fontWeight: "500",
    ...Platform.select({
      android: {
        fontSize: 14
      },
      ios: {
        fontSize: 16
      }
    }),
  },
  homeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16
  },
  homeSectionText:{
    fontSize: 20,
    fontWeight: "bold"
  },
  homeLabelText:{
    fontSize: 16,
    fontWeight: "bold"
  },
  screenTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 75,
  },
  clientMainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary700
  },
  headerAddButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  headerAddButtonText: {
    color: colors.primary500,
    marginLeft: 4,
    fontWeight: "500",
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center"
  },  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16
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
  buttonRipple: {
    height: 50,
  },
  textInput: {
    backgroundColor: colors.textInputBackgroundColor
  }
  /* keyboardView: {
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
  buttonContained: {
    height: 50,
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
  },  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16
  },
  buttonOutlined: {
    height: 50,
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  buttonOption: {
    justifyContent: "center",
    borderRadius: 4,
    borderColor: colors.primary300
  },
  buttonSelectedOption: {
    backgroundColor: colors.primary300,
    flexDirection: "row-reverse"
  },
  buttonOptionRipple: {
    height: 40,
  },
  input: {
    height: 50,
  },
  homeHeader: {
    flexDirection: "row",
    gap: 24,
    alignItems: "flex-end",
    padding: 20,
    ...Platform.select({
        android: {
          height: 95
        },
        ios: {
          height: 120
        }
    })
  },
  homeClientPrimaryBackground: {
    backgroundColor: colors.primary500
  },
  homeSupplierPrimaryBackground: {
    backgroundColor: colors.secondary500
  },
  homeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 2, // Ensure content is above overlay
  },
  homeBackgroundImage: {
    flex: 1,
    position: "relative",
  },
  homeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    zIndex: 1,
  },
  homeTopCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: 140,
    gap: 24
  },
  homeCardRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  homeCard: {
    borderRadius: 15,
    padding: 20,
    width: "48%",
    aspectRatio: 1,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  homeBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: colors.red,
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  homeBadgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  homeCardTextContainer: {
    position: "absolute",
    bottom: 14
  },
  homeCardText: {
    color: colors.white,
    fontWeight: "500",
    ...Platform.select({
      android: {
        fontSize: 17
      },
      ios: {
        fontSize: 20
      }
  }),
  },
  clientTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  clientTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary700,
  },
  requestAddButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  requestAddButtonText: {
    color: colors.primary500,
    marginLeft: 4,
    fontWeight: "500",
  },
  whiteBackgroundScreen: {
    flex: 1,
    backgroundColor: colors.white
  } */
});
