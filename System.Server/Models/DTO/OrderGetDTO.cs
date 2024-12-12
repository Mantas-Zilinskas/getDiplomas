using System.Server.Enums;
using System.Text.Json.Serialization;

namespace System.Server.Models.DTO
{
    public class OrderGetDTO
    {
        public long Id { get; set; }
        public OrderStatus Status { get; set; }
        public List<OrderGetProductDTO> Products { get; set; }
        public decimal Tip { get; set; }
        public long ReservationId { get; set; }
        public List<PaymentDTO>? Payments { get; set; }
    }
}
