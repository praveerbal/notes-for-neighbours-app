import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const styles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: COLORS.cream,
    flexGrow: 1,
  },

  centerPage: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.cream,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  logoCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: COLORS.navy,
    borderWidth: 4,
    borderColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },

  logoMain: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.white,
  },

  logoNote: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.gold,
    marginHorizontal: 2,
  },

  logoLabel: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.navy,
    letterSpacing: 0.2,
  },

  heroEmojiCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.lightGold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },

  heroEmoji: {
    fontSize: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
    color: COLORS.navy,
    letterSpacing: -0.5,
  },

  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: COLORS.gray,
    marginBottom: 20,
  },

  smallText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 14,
    lineHeight: 18,
  },

  screenTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.navy,
    marginBottom: 8,
    letterSpacing: -0.5,
  },

  screenSubtitle: {
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.gray,
    marginBottom: 20,
  },

  welcomeBox: {
    backgroundColor: COLORS.navy,
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
    borderWidth: 2,
    borderColor: COLORS.gold,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },

  welcomeTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },

  welcomeText: {
    color: "#EAF1FF",
    fontSize: 15,
    lineHeight: 22,
  },

  primaryButton: {
    backgroundColor: COLORS.blue,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 12,
    shadowColor: COLORS.blue,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gold,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },

  secondaryButtonText: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: "800",
  },

  backText: {
    marginTop: 18,
    fontSize: 16,
    color: COLORS.navy,
    fontWeight: "700",
  },

  dots: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 8,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: COLORS.gold,
    width: 22,
  },

  cardButton: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 7,
    backgroundColor: COLORS.gold,
  },

  cardIconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.lightGold,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },

  cardEmoji: {
    fontSize: 26,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
    color: COLORS.navy,
  },

  cardSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    color: COLORS.navy,
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  warningBox: {
    backgroundColor: COLORS.lightGold,
    borderColor: COLORS.gold,
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
  },

  warningTitle: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 5,
  },

  warningText: {
    color: "#5C4100",
    fontSize: 14,
    lineHeight: 20,
  },

  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginTop: 16,
    marginBottom: 8,
  },

  instrumentCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  instrumentImage: {
    width: 92,
    height: 92,
    borderRadius: 18,
    marginRight: 14,
  },

  instrumentMeta: {
    color: COLORS.blue,
    fontWeight: "700",
    fontSize: 14,
  },

  detailImage: {
    width: "100%",
    height: 260,
    borderRadius: 24,
    marginBottom: 20,
  },

  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  tag: {
    backgroundColor: COLORS.lightGold,
    color: COLORS.navy,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: "800",
    borderWidth: 1,
    borderColor: COLORS.gold,
    overflow: "hidden",
  },

  detailText: {
    color: COLORS.gray,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },

  safetyBox: {
    backgroundColor: "#EEF5FF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CFE1FF",
  },

  safetyTitle: {
    color: COLORS.navy,
    fontWeight: "900",
    fontSize: 15,
    marginBottom: 5,
  },

  safetyText: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 20,
  },

    emptyBox: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignItems: "center",
    marginTop: 20,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.navy,
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 15,
    color: COLORS.gray,
    lineHeight: 22,
    textAlign: "center",
  },

  instrumentImagePlaceholder: {
    width: 92,
    height: 92,
    borderRadius: 18,
    marginRight: 14,
    backgroundColor: COLORS.lightGold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gold,
  },

  instrumentImagePlaceholderText: {
    fontSize: 34,
  },

  detailImagePlaceholder: {
    width: "100%",
    height: 260,
    borderRadius: 24,
    marginBottom: 20,
    backgroundColor: COLORS.lightGold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gold,
  },

  detailImagePlaceholderText: {
    fontSize: 64,
  },

    adminCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  adminCardTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: COLORS.navy,
    marginBottom: 8,
  },

  adminCardMeta: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.blue,
    marginBottom: 8,
  },

  adminCardText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 21,
    marginBottom: 3,
  },

  reasonBox: {
    backgroundColor: COLORS.lightGold,
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },

  reasonTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.navy,
    marginBottom: 5,
  },

  reasonText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
    activitySection: {
    marginTop: 28,
  },

  activitySectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.navy,
    marginBottom: 14,
  },

  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    flexDirection: "row",
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  activityImage: {
    width: 82,
    height: 82,
    borderRadius: 16,
    marginRight: 14,
  },

  activityImagePlaceholder: {
    width: 82,
    height: 82,
    borderRadius: 16,
    marginRight: 14,
    backgroundColor: COLORS.lightGold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gold,
  },

  activityImagePlaceholderText: {
    fontSize: 32,
  },

  activityHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 6,
  },

  activityTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.navy,
  },

  activityMeta: {
    fontSize: 14,
    color: COLORS.blue,
    fontWeight: "800",
    marginBottom: 6,
  },

  activityText: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 19,
    marginBottom: 3,
  },

  statusPill: {
    backgroundColor: COLORS.lightGold,
    borderColor: COLORS.gold,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 999,
  },

  statusPillText: {
    fontSize: 10,
    fontWeight: "900",
    color: COLORS.navy,
  },
});

