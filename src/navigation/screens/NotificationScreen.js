import * as React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { initializeApp } from 'firebase/app';



// Define your Firebase config here
const config = {
  apiKey: 'your_api_key',
  authDomain: 'your_auth_domain',
  databaseURL: 'your_database_url',
  projectId: 'your_project_id',
  storageBucket: 'your_storage_bucket',
  messagingSenderId: 'your_messaging_sender_id',
  appId: 'your_app_id',
};

initializeApp(config);

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    // Initialize the state object
    this.state = {
      notifications: [],
    };

    // Initialize the FCM module and request permission for receiving notifications
    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(() => {
        console.log('Permission granted');
        return messaging.getToken();
      })
      .then((token) => {
        console.log('FCM token:', token);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    // Set up listener for incoming notifications and handle them
    messaging.onMessage((message) => {
      console.log('Received notification:', message);
      const { notifications } = this.state;
      const notificationArray = [...notifications];
      notificationArray.push({
        id: message.notificationId,
        message: message.notification.body,
        responderId: message.data.responderId,
        timestamp: Date.now(),
      });
      this.setState({ notifications: notificationArray });

      // If notification is not responded to within 10 seconds, bounce it to another responder
      setTimeout(() => {
        const index = notificationArray.findIndex((notification) => (
          notification.id === message.notificationId
        ));
        if (index !== -1 && notificationArray[index].responderId === message.data.responderId) {
          console.log(`Notification ${message.notificationId} not responded to, bouncing to another responder`);
          // Implement code to bounce the notification to another responder here
        }
      }, 10000);
    });
  }

  render() {
    const { notifications } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Notifications</Text>
        <ul>
          {notifications && notifications.map((notification) => (
            <li key={notification.id}>
              {notification.message}
            </li>
          ))}
        </ul>
      </View>
    );
  }
}

export default NotificationScreen;
