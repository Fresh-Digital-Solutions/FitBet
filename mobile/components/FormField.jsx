import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import icons from '../constants/icons'; // Correctly import the icons

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.fieldContainer, otherStyles]}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={(title === "Password" || title === "Confirm Password") && !showPassword}
          {...props}
        />

        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
  label: {
    fontSize: 16,
    color: '#D3D3D3',
    marginBottom: 8,
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
});

export default FormField;
