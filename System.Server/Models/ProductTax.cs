namespace System.Server.Models
{
    public class ProductTax
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public long TaxId { get; set; }
    }
}
