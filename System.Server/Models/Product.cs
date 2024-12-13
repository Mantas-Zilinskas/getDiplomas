namespace System.Server.Models
{
    public class Product
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public long DiscountId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
