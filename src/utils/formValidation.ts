
export const validateBookingForm = (destination: string, guests: { adults: number; children: number; seniors: number }) => {
  if (!destination || guests.adults + guests.children + guests.seniors === 0) {
    return 'Please select a destination and add at least one guest.';
  }
  return null;
};



