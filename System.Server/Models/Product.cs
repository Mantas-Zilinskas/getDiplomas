namespace System.Server.Models
{
    public class Product
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public long DiscountId { get; set; }
    }
}
