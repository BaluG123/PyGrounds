# Google Play Console: Data Safety Step-by-Step Answers for PyGrounds

This guide walks you through completing the **Data Safety** questionnaire in the Google Play Console for the PyGrounds app. These answers are fully customized to the app's real functionality (Firebase Auth, Firestore progress syncing, Google Sign-In, and FCM push notifications).

---

## Step 1: Overview
*   Read the introductory screen.
*   Click **Next** to proceed to the **Data collection and security** section.

---

## Step 2: Data Collection and Security
This matches the screen shown in your screenshot:

1.  **Does your app collect or share any of the required user data types?**
    *   👉 Select **Yes**. 
    *   *(Rationale: Because the app integrates Google Sign-In, Firebase Auth, Firestore progress sync, and Firebase Cloud Messaging tokens, it collects personal data and device identifiers).*
2.  **Is all of the user data collected by your app encrypted in transit?**
    *   👉 Select **Yes**.
    *   *(Rationale: All network traffic between your React Native app, Google Auth, and Firebase APIs is forced over secure HTTPS connections).*
3.  **Do you provide a way for users to request that their data be deleted?**
    *   👉 Select **Yes**.
    *   *(Note: You will need to provide a simple URL in the console where users can submit a request to delete their account/data, such as a contact form, email address mailto link, or a page on your website).*

Click **Next**.

---

## Step 3: Data Types
On this screen, you must check the boxes next to the specific data types PyGrounds collects:

1.  **Personal Info**:
    *   ☑ Check **Name**
    *   ☑ Check **Email address**
    *   ☑ Check **User IDs** *(e.g., Firebase Authentication `uid`)*
2.  **App Activity**:
    *   ☑ Check **App interactions** *(e.g., keeping track of lesson progress, quiz scores, and lab code runs)*
3.  **Device or other IDs**:
    *   ☑ Check **Device or other IDs** *(e.g., Firebase Cloud Messaging (FCM) push notification tokens)*

Click **Next**.

---

## Step 4: Data Usage and Handling
On this screen, Play Console will ask you to configure the details for **each** checked data type. Click on each item and configure it as follows:

### 1. Personal Info > Name
*   **Collected or Shared?**: Select **Collected** *(the app collects this, but does not share it with external third parties)*.
*   **Is this data processed ephemerally?**: Select **No** *(it is saved to Firestore for multi-device sync)*.
*   **Is this data required or optional?**: Select **Optional** *(users can choose to use the app anonymously/offline, making login optional)*.
*   **Why is this data collected?**:
    *   ☑ Check **App functionality**
    *   ☑ Check **Personalization**

### 2. Personal Info > Email address
*   **Collected or Shared?**: Select **Collected**.
*   **Is this data processed ephemerally?**: Select **No**.
*   **Is this data required or optional?**: Select **Optional** *(account login is optional)*.
*   **Why is this data collected?**:
    *   ☑ Check **App functionality** *(account registration and data syncing)*

### 3. Personal Info > User IDs
*   **Collected or Shared?**: Select **Collected**.
*   **Is this data processed ephemerally?**: Select **No**.
*   **Is this data required or optional?**: Select **Optional** *(generated only when a user logs in)*.
*   **Why is this data collected?**:
    *   ☑ Check **App functionality** *(identifying unique users)*

### 4. App Activity > App interactions
*   **Collected or Shared?**: Select **Collected**.
*   **Is this data processed ephemerally?**: Select **No**.
*   **Is this data required or optional?**: Select **Optional** *(only synced if logged in)*.
*   **Why is this data collected?**:
    *   ☑ Check **App functionality** *(saves your learning state, completed lessons, quiz scores)*

### 5. Device or other IDs > Device or other IDs
*   **Collected or Shared?**: Select **Collected**.
*   **Is this data processed ephemerally?**: Select **No**.
*   **Is this data required or optional?**: Select **Optional** *(push notifications are strictly opt-in)*.
*   **Why is this data collected?**:
    *   ☑ Check **App functionality** *(delivering push notification study reminders)*

Click **Next**.

---

## Step 5: Preview
*   Review your finalized answers.
*   Click **Submit** or **Save** to complete your Google Play Console Data Safety requirements!
