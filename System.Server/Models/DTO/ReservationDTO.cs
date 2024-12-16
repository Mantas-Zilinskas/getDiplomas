using System.Server.Enums;

namespace System.Server.Models
{
    public class ReservationDTO
    {
        public DateTime BookingTime { get; set; }
        public DateTime AppointmentTime { get; set; }
        public long EmployeeId { get; set; }
        public required string CustomerName { get; set; }
        public required string CustomerPhoneNumber { get; set; }
        public int NumberOfGuests { get; set; }
        public ServiceType Service { get; set; }
    }
}
