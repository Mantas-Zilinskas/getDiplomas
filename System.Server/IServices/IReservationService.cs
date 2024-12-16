using System.Server.Models;

namespace System.Server.IServices
{
    public interface IReservationService
    {
        Task<IEnumerable<Reservation>> GetAllReservations();
        Task<Reservation> GetReservationById(long Id);
        Task CreateReservation(ReservationDTO reservation);
        Task UpdateReservation(long Id, ReservationDTO reservation);
        Task DeleteReservation(long Id);
    }
}
