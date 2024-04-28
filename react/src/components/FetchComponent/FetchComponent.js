import React, { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

const MAX_RETRIES = 3;
// Timeout, Bad Gateway, Service Unavailable, Gateway Timeout, Connection Timed Out, A Timeout Occurred
const RETRY_CODES = [408, 502, 503, 504, 522, 524];

function TryFetch(route, method, body, onSuccess, onFail) {
  const fetchData = async (retryCount = 0) => {
    try {
      const options = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',  
      }
      if (method !== 'GET') {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/${route}`, options);
      if (response.ok) {
        const data = await response.json();
        onSuccess?.(data);
      } else {
        if (response.status === 401 || response.status === 403) {
          // when user is not authorized, clear the secured cookie
          secureLocalStorage.clear();
          onFail?.(new Error('Unauthorized'));
        } else if (RETRY_CODES.includes(response.status) && retryCount < MAX_RETRIES) {
          setTimeout(() => fetchData(retryCount + 1), 1000);
        } else {
          onFail?.(new Error(`Request failed with status code ${response.status}`));
        }
      }
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => fetchData(retryCount + 1), 1000);
      } else {
        onFail?.(error);
      }
    }
  };

  fetchData();

  return null;
}

export default TryFetch;
