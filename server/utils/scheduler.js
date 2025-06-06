const cron = require('node-cron');
const RecyclingBooking = require('../models/RecyclingBooking');
const { sendRecyclingCompletionEmail } = require('./emailService');

// Schedule task to update booking status and send completion emails
const scheduleStatusUpdates = () => {
  try {
    // Validate cron expression
    if (!cron.validate('0 * * * *')) {
      throw new Error('Invalid cron expression');
    }

    // Run every hour
    const task = cron.schedule('0 * * * *', async () => {
      try {
        console.log('Running scheduled status update check...');
        
        // Find bookings that are 48 hours old and still pending
        const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
        
        const bookings = await RecyclingBooking.find({
          status: 'pending',
          createdAt: { $lte: fortyEightHoursAgo }
        }).populate('userId', 'email');

        console.log(`Found ${bookings.length} bookings to update`);

        for (const booking of bookings) {
          try {
            // Update status to completed
            booking.status = 'completed';
            await booking.save();

            // Send completion email if user exists
            if (booking.userId && booking.userId.email) {
              await sendRecyclingCompletionEmail(booking.userId.email, booking);
            }

            console.log(`Updated booking ${booking._id} to completed status`);
          } catch (error) {
            console.error(`Error processing booking ${booking._id}:`, error);
          }
        }
      } catch (error) {
        console.error('Error in scheduled status update:', error);
      }
    }, {
      scheduled: true,
      timezone: 'UTC' // Use UTC to avoid timezone issues
    });

    console.log('Status update scheduler started successfully');
    return task;
  } catch (error) {
    console.error('Error starting scheduler:', error);
    return null;
  }
};

module.exports = {
  scheduleStatusUpdates
}; 