using System.Text.Json.Serialization;

namespace System.Server.Models.DTO
{
    public class OrderPostDTO
    {
        public int UserId { get; set; }
        public List<ProductOrderDTO> Products { get; set; }
        public decimal Tip { get; set; }
        public int DiscountId { get; set; }
        public int ReservationId { get; set; }
    }
}
