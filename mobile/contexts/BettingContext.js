import React, { createContext, useState, useContext } from 'react';

const BetContext = createContext();

export const BetProvider = ({ children }) => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [betAmount, setBetAmount] = useState(5.0);
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(5);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState({});
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const handleSelectFriend = (friend) => setSelectedFriend(friend);
  const handleSetBetAmount = (amount) => setBetAmount(amount);
  const handleSetWorkoutsPerWeek = (workouts) => setWorkoutsPerWeek(workouts);
  const handleSetSelectedStartDate = (date) => setSelectedStartDate(date);
  const handleSetSelectedEndDate = (date) => setSelectedEndDate(date);
  const handleSetSelectedPeriod = (period) => setSelectedPeriod(period);
  const handleSetSendingRequest = (status) => setIsSendingRequest(status);

  return (
    <BetContext.Provider
      value={{
        selectedFriend,
        betAmount,
        workoutsPerWeek,
        selectedStartDate,
        selectedEndDate,
        selectedPeriod,
        isSendingRequest,
        handleSelectFriend,
        handleSetBetAmount,
        handleSetWorkoutsPerWeek,
        handleSetSelectedStartDate,
        handleSetSelectedEndDate,
        handleSetSelectedPeriod,
        handleSetSendingRequest,
      }}
    >
      {children}
    </BetContext.Provider>
  );
};

export const useBet = () => useContext(BetContext);