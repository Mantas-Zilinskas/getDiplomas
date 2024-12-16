using Microsoft.EntityFrameworkCore;
using System.Server.Data;
using System.Server.IServices;
using System.Server.Models;

namespace System.Server.Services
{
    public class ReservationService : IReservationService
    {
        private readonly SystemContext _context;
        public ReservationService(SystemContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Reservation>> GetAllReservations()
        {
            var reservations = await _context.Reservations.ToListAsync();
            return reservations;
        }
        public async Task<Reservation> GetReservationById(long id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                throw new KeyNotFoundException($"Reservation with ID {id} not found.");
            }
            return reservation;

        }
        public async Task CreateReservation(ReservationDTO reservation)
        {
            var newReservation = new Reservation
            {
                BookingTime = reservation.BookingTime,
                AppointmentTime = reservation.AppointmentTime,
                EmployeeId = reservation.EmployeeId,
                CustomerName = reservation.CustomerName,
                CustomerPhoneNumber = reservation.CustomerPhoneNumber,
                NumberOfGuests = reservation.NumberOfGuests,
                Service = reservation.Service,
            };
            _context.Reservations.Add(newReservation);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateReservation(long id, ReservationDTO reservation)
        {
            var oldReservation = await _context.Reservations.FindAsync( id);
            if (oldReservation == null)
            {
                throw new KeyNotFoundException($"Reservation with ID {id} not found.");
            }
            oldReservation.BookingTime = reservation.BookingTime;
            oldReservation.AppointmentTime = reservation.AppointmentTime;
            oldReservation.EmployeeId = reservation.EmployeeId;
            oldReservation.CustomerName = reservation.CustomerName;
            oldReservation.CustomerPhoneNumber = reservation.CustomerPhoneNumber;
            oldReservation.NumberOfGuests = reservation.NumberOfGuests;
            oldReservation.Service = reservation.Service;
            await _context.SaveChangesAsync();
        }
        public async Task DeleteReservation(long id)
        {
            var oldReservation = await _context.Reservations.FindAsync(id);
            if (oldReservation != null)
            {
                _context.Reservations.Remove(oldReservation);
            }
            await _context.SaveChangesAsync();
        }
    }
}
