'use client';

import React, { useState } from 'react';
import Alert from '../components/Alert';
import { AlertItem } from './interfaces';

export default function Home() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = (type: 'success' | 'error' | 'info', message: string) => {
    const newAlert = {
      id: Date.now(),
      type,
      message,
    };
    setAlerts([...alerts, newAlert]);

    setTimeout(() => {
      setAlerts((currentAlerts) => currentAlerts.filter((alert) => alert.id !== newAlert.id));
    }, 5000); // Remove alert after 5 seconds
  };

  const removeAlert = (id: number) => {
    setAlerts((currentAlerts) => currentAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 m-4 w-full max-w-sm z-50">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
      <button onClick={() => addAlert('success', 'This is a success alert')}>Add Success Alert</button>
      <button onClick={() => addAlert('error', 'This is an error alert')}>Add Error Alert</button>
      <button onClick={() => addAlert('info', 'This is an info alert')}>Add Info Alert</button>
    </div>
  );
}
