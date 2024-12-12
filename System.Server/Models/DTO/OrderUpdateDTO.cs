namespace System.Server.Models.DTO
{
    public class OrderUpdateDTO
    {
        public List<OrderPostProductDTO> Products { get; set; }
        public decimal Tip { get; set; }
        public int DiscountId { get; set; }
    }
}
