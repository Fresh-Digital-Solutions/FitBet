import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  iconSource, // Image source for the icon
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading && styles.buttonLoading,
      ]}
      disabled={isLoading}
    >
      {iconSource && (
        <Image
          source={iconSource}
          style={styles.icon}
          resizeMode="contain"
        />
      )}
      <Text style={[styles.text, textStyles]}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.loadingIndicator}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonLoading: {
    opacity: 0.5,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  loadingIndicator: {
    marginLeft: 8,
  },
  icon: {
    position: 'absolute',
    left: 16, // Position the icon on the far left
    width: 40,
    height: 40,
  },
});

export default CustomButton;
