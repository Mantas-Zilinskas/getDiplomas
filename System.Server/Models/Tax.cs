namespace System.Server.Models
{
    public class Tax
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
    }
}
