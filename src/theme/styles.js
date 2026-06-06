import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderGold,
    padding: 15,
    marginBottom: 15,
  },
  titleText: {
    color: colors.textLight,
    fontSize: 28,
    fontFamily: 'HyliaSerif',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bodyText: {
    color: colors.textLight,
    fontSize: 16,
    fontFamily: 'Calamity',
  },
  input: {
    backgroundColor: 'rgba(7, 7, 7, 0.5)',
    color: colors.textLight,
    fontFamily: 'Calamity',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  buttonPrimary: {
    backgroundColor: 'rgba(200, 168, 78, 0.2)',
    borderWidth: 1,
    borderColor: colors.accentGold,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.accentGoldLight,
    fontFamily: 'Calamity',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
