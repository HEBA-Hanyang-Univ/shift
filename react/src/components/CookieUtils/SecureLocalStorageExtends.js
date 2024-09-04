import secureStorage from 'react-secure-storage';
// Usage
// saveDataWithExpiration('totalNum', 123, 60); // Save 'totalNum' with expiration in 60 minutes
// const totalNumWithExpiration = loadData('totalNum'); // Load 'totalNum' and check expiration

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

export const loadUserData = (key) => {
  try {
    const userData = JSON.parse(secureStorage.getItem("userData"));
    if (!userData) return null;

    const now = new Date().getTime();

    if (now >= userData.expirationDate) {
      // Data expired
      secureStorage.removeItem("userData");
      return null;
    }

    return userData.data[key];
  } catch (e) {
    console.log('Failed to parse data from storage');
    return null;
  }
}

export const saveUserData = (key, data, expirationInSeconds) => {
  try {
    const userData = JSON.parse(secureStorage.getItem("userData"));
    // If expirationInSeconds is not provided, use the expiration date from the stored data or set it to 1 hour
    const expirationDate = expirationInSeconds ? new Date().getTime() + expirationInSeconds * 1000 : userData.expirationDate || new Date().getTime() + 60 * 60 * 1000;
    if (!userData) {
      secureStorage.setItem("userData", JSON.stringify({ data: { [key]: data }, expirationDate: expirationDate }));
    } else {
      userData.data[key] = data;
      secureStorage.setItem("userData", JSON.stringify({ data: userData.data, expirationDate: expirationDate }));
    }
  } catch (e) {
    console.log('Failed to save data to storage');
    return false;
  }
}

export const clearUserData = () => {
  secureStorage.removeItem("userData");
}