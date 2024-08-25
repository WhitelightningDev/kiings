# Car Wash Booking Application

Developed by **WhitelightningDev**

## Overview

This is a web-based car wash booking application that allows users to schedule car washes with additional services. The app features a clean, user-friendly interface where customers can select a wash type, add extra services, choose a preferred date and time, and receive email confirmations. It also sends notifications to the admin about new bookings.

## Features

- **Booking Form**: Users can fill out a form to book their car wash, specifying details like the type of wash, additional services, and scheduling preferences.
- **Dynamic Pricing**: The application calculates the total cost based on the selected wash type and additional services.
- **Email Notifications**: After a successful booking, the user receives a confirmation email, and the admin is notified of the new booking.
- **Responsive Design**: The interface is designed to be responsive and mobile-friendly.
- **Styled with Bootstrap**: The application leverages Bootstrap for a modern and consistent look.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Email Handling**: Nodemailer
- **Styling**: Bootstrap, custom CSS
- **State Management**: React hooks
- **HTTP Client**: Axios

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/car-wash-booking-app.git
   cd car-wash-booking-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   - Create a `.env` file in the root directory and configure the following variables:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-email-password
     ADMIN_EMAIL=admin-email@example.com
     PORT=3030
     ```

4. **Run the application**:
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3030`.

## Usage

- **Booking a Car Wash**: Navigate to the homepage, fill in the required fields, and submit the form. You will receive a confirmation email shortly after.
- **Admin Notifications**: Admin will receive an email notification for each new booking made through the application.

## Project Structure

- **/src**: Contains all the React components, styles, and assets.
  - **/components**: Reusable React components.
  - **/assets**: Static files like images.
  - **/styles**: Custom CSS files.
  - **/functions**: Contains utility functions such as `washData.js`.
- **server.js**: The backend server file that handles bookings and email notifications.

## Contributing

If you wish to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Contributions are welcome!

## License

This project is open-source and available under the MIT License.
