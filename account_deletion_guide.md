# Setting Up a Google Play Compliant Account Deletion Form URL

Google requires apps that allow account creation to provide a **web-based method** for users to request account deletion. This ensures that a user who has deleted the app can still request their data be deleted without having to reinstall it.

Here is the easiest, 100% free, and fully compliant way to set this up in **under 3 minutes** using **Google Forms**.

---

## 🛠️ Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com) and create a **Blank Form**.
2. Title the form: `PyGrounds - Account & Data Deletion Request`
3. Add a brief description:
   > "Use this form to request the permanent deletion of your PyGrounds account, learning progress, and personal data. Once submitted, we will process your request and delete all records associated with your account from our servers within 7 business days."

---

## 📝 Step 2: Add the Required Fields
Create **three** simple questions in the form:

1. **Email Address** *(Required, Short Answer)*:
   * **Question:** "What is the email address associated with your PyGrounds account?"
2. **Account Identifier (Optional)** *(Short Answer)*:
   * **Question:** "Optional: What is your Google account name or User ID?"
3. **Confirmation Checkbox** *(Required, Multiple Choice / Checkbox)*:
   * **Question:** "I confirm that I want to permanently delete my account and all my learning progress."
   * **Option:** "Yes, delete my account and progress."

---

## 🔗 Step 3: Publish and Get the Link
1. Click the **Send** button in the top right corner of Google Forms.
2. Select the **Link (chain icon)** tab.
3. Check **Shorten URL**.
4. Copy the link (it will look like `https://forms.gle/...`).

---

## 📱 Step 4: Add the Link in Google Play Console
1. Go to your **Google Play Console** dashboard.
2. Navigate to **App Content** (under *Policy and programs* in the left menu) > **Data safety** > **Data collection and security**.
3. Under the question **"Do you provide a way for users to request that their data be deleted?"**, select **Yes**.
4. A text box will appear asking for your **web link**. **Paste your Google Form URL there!**

---

## 💡 What happens in the app?
Google's policy also requires you to have a way to delete accounts **inside** the app. 

I have already went ahead and updated `src/screens/AccountScreen.tsx` for you to include a beautiful, native **Delete Account** button. 
* It only appears when a user is signed in.
* It warns them with an native alert popup.
* It securely calls Firebase's `delete()` method on their active authentication record, instantly removing them from your database and complying perfectly with the rules!
