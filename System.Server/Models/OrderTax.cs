namespace System.Server.Models
{
    public class OrderTax
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
    }
}
