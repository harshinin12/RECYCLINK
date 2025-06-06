const RecyclingBooking = require('../models/RecyclingBooking');
const User = require('../models/User');
const { sendRecyclingCompletionEmail } = require('./emailService');

async function updateBookingStatus() {
  try {
    console.log('Running booking status update check...');
    
    // Find all pending bookings that are older than 48 hours
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    // Find bookings that need to be updated
    const bookingsToUpdate = await RecyclingBooking.find({
      status: 'pending',
      createdAt: { $lte: fortyEightHoursAgo }
    }).populate('userId', 'email');

    // Update each booking and send email
    for (const booking of bookingsToUpdate) {
      // Update status
      booking.status = 'SUCCCESSFULLY RECYCLED';
      await booking.save();

      // Send completion email
      if (booking.userId && booking.userId.email) {
        await sendRecyclingCompletionEmail(booking.userId.email, booking);
      }
    }

    console.log(`Updated ${bookingsToUpdate.length} bookings to completed status`);
    return bookingsToUpdate.length;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
}

module.exports = updateBookingStatus; 