const nodemailer = require('nodemailer');

// Check if email credentials are configured
const isEmailConfigured = () => {
  console.log('Checking email configuration:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
  return process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;
};

// Create a transporter using Gmail
const createTransporter = () => {
  if (!isEmailConfigured()) {
    console.warn('Email credentials not configured. Emails will not be sent.');
    return null;
  }

  console.log('Creating email transporter with Gmail...');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    debug: true, // Enable debug logging
    logger: true // Enable logger
  });

  // Verify transporter configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.error('Email transporter verification failed:', error);
    } else {
      console.log('Email transporter is ready to send messages');
    }
  });

  return transporter;
};

// Test email configuration
async function testEmailConfig() {
  if (!isEmailConfigured()) {
    console.error('Email configuration is missing. Please check your .env file.');
    return false;
  }

  const testTransporter = createTransporter();
  if (!testTransporter) {
    console.error('Failed to create email transporter.');
    return false;
  }

  try {
    await testTransporter.verify();
    console.log('Email configuration is valid and ready to use.');
    return true;
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return false;
  }
}

// Send test email
async function sendTestEmail(toEmail) {
  console.log('Attempting to send test email to:', toEmail);
  
  if (!isEmailConfigured()) {
    console.error('Email configuration is missing. Please check your .env file.');
    return false;
  }

  const testTransporter = createTransporter();
  if (!testTransporter) {
    console.error('Failed to create email transporter.');
    return false;
  }

  const mailOptions = {
    from: `"E-Waste Facility" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Test Email from E-Waste Facility',
    text: 'This is a test email to verify the email configuration.',
    html: '<h1>Test Email</h1><p>This is a test email to verify the email configuration.</p>'
  };

  try {
    console.log('Sending test email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const info = await testTransporter.sendMail(mailOptions);
    console.log('Test email sent successfully:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending test email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    return false;
  }
}

// Send booking confirmation email
async function sendBookingConfirmation(userEmail, bookingDetails) {
  console.log('Attempting to send booking confirmation email to:', userEmail);
  
  if (!isEmailConfigured()) {
    console.error('Email configuration is missing. Please check your .env file.');
    return false;
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.error('Failed to create email transporter.');
    return false;
  }

  const mailOptions = {
    from: `"E-Waste Facility" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'E-Waste Recycling Booking Confirmation',
    html: `
      <h2>Your E-Waste Recycling Booking is Confirmed!</h2>
      <p>Thank you for choosing our e-waste recycling service. Here are your booking details:</p>
      <ul>
        <li><strong>Device Type:</strong> ${bookingDetails.deviceType}</li>
        <li><strong>Brand:</strong> ${bookingDetails.brand}</li>
        <li><strong>Model:</strong> ${bookingDetails.modelName}</li>
        <li><strong>Pickup Address:</strong> ${bookingDetails.pickupAddress}</li>
        <li><strong>Phone Number:</strong> ${bookingDetails.phoneNumber}</li>
        <li><strong>Recycling Price:</strong> ₹${bookingDetails.recyclingPrice}</li>
        <li><strong>Status:</strong> ${bookingDetails.status}</li>
      </ul>
      <p>We will process your e-waste within 48 hours. You will receive another email once the recycling is completed.</p>
      <p>Thank you for helping us make the environment cleaner!</p>
    `
  };

  try {
    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    return false;
  }
}

// Send recycling completion email
async function sendRecyclingCompletionEmail(userEmail, bookingDetails) {
  console.log('Attempting to send recycling completion email to:', userEmail);
  
  if (!isEmailConfigured()) {
    console.error('Email configuration is missing. Please check your .env file.');
    return false;
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.error('Failed to create email transporter.');
    return false;
  }

  const mailOptions = {
    from: `"E-Waste Facility" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'E-Waste Recycling Completed Successfully',
    html: `
      <h2>Your E-Waste Has Been Successfully Recycled!</h2>
      <p>We are pleased to inform you that your e-waste recycling has been completed successfully.</p>
      <h3>Recycling Details:</h3>
      <ul>
        <li><strong>Device Type:</strong> ${bookingDetails.deviceType}</li>
        <li><strong>Brand:</strong> ${bookingDetails.brand}</li>
        <li><strong>Model:</strong> ${bookingDetails.modelName}</li>
        <li><strong>Recycling Price:</strong> ₹${bookingDetails.recyclingPrice}</li>
      </ul>
      <p>Thank you for your contribution to environmental sustainability!</p>
      <p>Your recycled materials have been properly processed and disposed of according to environmental standards.</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
    `
  };

  try {
    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending recycling completion email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    return false;
  }
}

module.exports = {
  sendBookingConfirmation,
  sendRecyclingCompletionEmail,
  testEmailConfig,
  sendTestEmail
}; 