using System.Server.Enums;

namespace System.Server.Models
{
    public class Reservation
    {
        public long Id { get; set; }
        public DateTime BookingTime { get; set; }
        public DateTime AppointmentTime { get; set; }
        public long EmployeeId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhoneNumber { get; set; }
        public int NumberOfGuests { get; set; }
        public ServiceType Service { get; set; }
    }
}
