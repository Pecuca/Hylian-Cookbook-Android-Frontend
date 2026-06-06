import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function TabSelector({ tabs, activeTab, onTabChange }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity 
            key={tab.id}
            style={[
              styles.tab, 
              isActive && styles.activeTab,
              index === 0 && styles.leftTab,
              index === tabs.length - 1 && styles.rightTab
            ]}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderGold,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(200, 168, 78, 0.3)',
  },
  leftTab: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  rightTab: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  text: {
    color: colors.textMuted,
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeText: {
    color: colors.accentGoldLight,
  },
});
