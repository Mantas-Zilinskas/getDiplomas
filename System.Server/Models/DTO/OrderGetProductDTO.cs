namespace System.Server.Models.DTO
{
    public class OrderGetProductDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public long DiscountId { get; set; }
    }
}
