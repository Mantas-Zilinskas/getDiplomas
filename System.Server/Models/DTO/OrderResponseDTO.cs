using System.Text.Json.Serialization;

namespace System.Server.Models.DTO
{
    public class OrderResponseDTO
    {
        public int UserId { get; set; }
        public List<ProductOrder> Products { get; set; }
        public decimal Tip { get; set; }
        public int DiscountId { get; set; }
        public int ReservationId { get; set; }
    }
}
