import secureStorage from 'react-secure-storage';

// Save data with expiration
export const saveDataWithExpiration = (key, data, expirationInMinutes=60) => {
    const expirationDate = new Date().getTime() + expirationInMinutes * 60 * 1000;
    secureStorage.setItem(key, JSON.stringify({ data, expirationDate }));
};

// Load data and check expiration
export const loadDataWithExpiration = (key) => {
  try {
    const data = JSON.parse(secureStorage.getItem(key));
    if (!data) return null;

    const now = new Date().getTime();

    if (now >= data.expirationDate) {
      // Data expired
      secureStorage.removeItem(key);
      return null;
    }

    return data.data;
  } catch (e) {
    console.log('Failed to parse data from storage');
    return null;
  }
};

// Usage
// saveDataWithExpiration('totalNum', 123, 60); // Save 'totalNum' with expiration in 60 minutes
// const totalNumWithExpiration = loadData('totalNum'); // Load 'totalNum' and check expiration