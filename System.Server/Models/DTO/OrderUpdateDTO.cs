using System.Text.Json.Serialization;

namespace System.Server.Models.DTO
{
    public class OrderUpdateDTO
    {
        public List<ProductOrder> Products { get; set; }
        public Decimal Tip { get; set; }
        public string Discount { get; set; }
    }
}
