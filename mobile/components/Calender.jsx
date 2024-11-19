import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { addDays, format, setHours, setMinutes, setSeconds } from 'date-fns';
import { UTCDate } from '@date-fns/utc';
import { useBet } from '../contexts/BettingContext'

const WeeklyBetCalendar = () => {
  const {
    selectedStartDate,
    selectedPeriod,
    handleSetSelectedStartDate,
    handleSetSelectedEndDate,
    handleSetSelectedPeriod,
  } = useBet();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day) => {
    // Initialize the start date in UTC
    const utcStartDate = new UTCDate(day.dateString);
    const startDateWithTime = setHours(setMinutes(setSeconds(utcStartDate, 0), 0), 5); // 5:00 AM UTC
    
    // Calculate end date (7 days from start date)
    const utcEndDate = addDays(startDateWithTime, 6); // Add 6 days to get a 7-day period
    const endDateWithTime = setHours(setMinutes(setSeconds(utcEndDate, 59), 59), 23); // 11:59 PM UTC
    
    console.log(endDateWithTime)
    // Set start and end dates
    handleSetSelectedStartDate(startDateWithTime);
    handleSetSelectedEndDate(endDateWithTime); // Make sure to set this before creating the period

    // Create the period object for marking dates
    const period = {};
    for (let i = 0; i <= 6; i++) {
      const currentDate = addDays(startDateWithTime, i);
      const dateString = format(currentDate, 'yyyy-MM-dd');
      
      if (i === 0) {
        period[dateString] = { startingDay: true, color: '#87DF4F', textColor: '#1C1C1C' };
      } else if (i === 6) {
        period[dateString] = { endingDay: true, color: '#87DF4F', textColor: '#1C1C1C' };
      } else {
        period[dateString] = { color: '#87DF4F', textColor: '#1C1C1C' };
      }
    }

    // Update the period
    handleSetSelectedPeriod(period);

    // Close the calendar
    closeCalendar();
  };

  const openCalendar = () => {
    setModalVisible(true);
  };

  const closeCalendar = () => {
    setModalVisible(false);
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={openCalendar}>
        <Text style={styles.openButtonText}>
          {selectedStartDate
            ? `Selected Period: ${format(selectedStartDate, 'MMM dd')} - ${format(addDays(selectedStartDate, 6), 'MMM dd')}`
            : 'Select Start Date'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCalendar}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={selectedPeriod}
              markingType="period"
              theme={{
                calendarBackground: '#313948',
                textSectionTitleColor: '#FFFFFF',
                dayTextColor: '#FFFFFF',
                todayTextColor: '#87DF4F',
                selectedDayBackgroundColor: '#87DF4F',
                selectedDayTextColor: '#1C1C1C',
                monthTextColor: '#FFFFFF',
                arrowColor: '#FFFFFF',
              }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeCalendar}>
              <Text style={styles.closeButtonText}>Close Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderColor: '#87DF4F',
    backgroundColor: '#566072',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    width: '100%',
  },
  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '50%',
    backgroundColor: '#313948',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#87DF4F',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WeeklyBetCalendar;
