namespace System.Server.Models
{
    public class OrderProduct
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
