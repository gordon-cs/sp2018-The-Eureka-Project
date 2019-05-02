import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headingView: {
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
    margin: 10
  },
  textInput: {
    height: 60,
    width: 280,
    borderColor: "#5b3b89",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 4
  },
  rowButtonsContainer: {
    justifyContent: "center",
    flexDirection: "row"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
    padding: 9
  },
  primaryButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#5b3b89"
  },
  secondaryButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "black"
  },
  longButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 280,
    height: 120,
    borderRadius: 20,
    backgroundColor: "#5b3b89"
  },
  narrowLongButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 1,
    width: 280,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#5b3b89"
  },
  addCourseNarrowLongButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 1,
    width: 280,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#1dafe3"
  },
  deleteNarrowLongButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 1,
    width: 280,
    height: 40,
    borderRadius: 15,
    backgroundColor: "red"
  },
  moreNarrowLongButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 1,
    width: 280,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#5b3b89",
  },
  logo: {
    height: 60,
    width: 280,
    resizeMode: "contain",
    margin: 20,
  },
  textButton: {
    alignItems: "center",
    color: "#5b3b89",
    borderRadius: 50,
    width: 160
  },
  contentContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 50,
  },
  mainText: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
    color: "black"
  },
  picker: {
    width: 280,
    height: 120,
  },
  playerImage: {
    resizeMode: "contain",
    width: 70,
    height: 70
  },
  iconsContainer: {
    flexDirection: "row",
    margin: 10
  },
});
