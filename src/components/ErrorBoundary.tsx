import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

// Custom error boundary component for functional components
const ErrorBoundary = ({children}: {children: React.ReactNode}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleError = (error, info) => {
    setHasError(true);
    setError(error);
    setErrorInfo(info);
  };

  const resetError = () => {
    setHasError(false);
    setError(null);
    setErrorInfo(null);
  };

  // This function simulates error catching during component rendering
  useEffect(() => {
    const errorHandler = (error, info) => {
      handleError(error, info);
    };

    window.onerror = errorHandler; // Catch errors globally

    return () => {
      window.onerror = null; // Clean up on unmount
    };
  }, []);

  // If an error is caught, render fallback UI
  if (hasError) {
    return (
      <View>
        <Text>Something went wrong: {error?.message}</Text>
        <Button title="Try Again" onPress={resetError} />
      </View>
    );
  }

  // If no error, render the children (your component)
  return children;
};

export default ErrorBoundary;
