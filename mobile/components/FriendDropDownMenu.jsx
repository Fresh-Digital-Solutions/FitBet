import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: '#87DF4F' }]}>
          Select A Friend
        </Text>
      );
    }
    return null;
  };

  const renderItem = (item) => {
    const isSelected = item.value === value;
    return (
      <View style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}>
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#87DF4F' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.dropdownMenu}
        itemContainerStyle= {styles.itemContainer}
        itemTextStyle= {styles.itemText}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select a Friend' : ''}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    width:'98%',
    padding: 16,
    
  },
  dropdownMenu: {
    borderColor: '#87DF4F',
    backgroundColor: '#566072',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
  },    
  dropdown: {
    height: 50,
    borderColor: '#87DF4F',
    backgroundColor: '#566072',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#566072',
    color: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'white',
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'white',
    textAlign: 'center'
    
  },
  itemContainer: {
    backgroundColor: '#87DF4F',
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  itemText: {
    color: 'white',
    textAlign:'center',
    fontWeight: 600,
    fontSize: 18
  },
  selectedItemContainer: {
    backgroundColor: '#313948',
  },
  selectedItemText: {
    color: '#1F2A36', 
    fontWeight: '600',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});