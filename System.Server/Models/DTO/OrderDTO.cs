using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Server.Enums;

namespace System.Server.Models.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public OrderStatus Status { get; set; }
        public List<ProductDTO> Products { get; set; }
        public Decimal Tip { get; set; }
        public string Discount { get; set; }
        public List<PaymentDTO> Payments { get; set; }

    }
}
