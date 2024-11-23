import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from '../pages/LoginScreen';
import ModernCalculator from '../pages/ModernCalculator';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <ModernCalculator />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;