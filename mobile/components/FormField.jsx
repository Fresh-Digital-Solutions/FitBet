import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import icons from '../constants/icons'; // Make sure this import is correct

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = title === "Password" || title === "Confirm Password";

  return (
    <View style={[styles.fieldContainer, otherStyles]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordField && !showPassword} // Toggles secureTextEntry based on showPassword
          {...props}
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
          >
            {icons[showPassword ? 'eye' : 'eyeHide']({ size: 24, color: 'black' })}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 12,
  },
  inputContainer: {
    width: '100%',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#87DF4F',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
  },
});

export default FormField;
