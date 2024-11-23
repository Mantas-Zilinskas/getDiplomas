namespace System.Server.Models
{
    public class ReservationDTO
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public DateTime BookingTime { get; set; }
        public DateTime AppointmentTime { get; set; }
        public long EmployeeId { get; set; }
        public long CustomerId { get; set; }

        public Service Service { get; set; }
    }
}
