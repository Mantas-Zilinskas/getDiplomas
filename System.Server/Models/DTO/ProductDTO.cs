namespace System.Server.Models.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string Name { get; set; }
        public Decimal Price { get; set; }
        public int Quantity { get; set; }
        public DiscountDTO? Discount { get; set; }
        public List<TaxDTO>? Taxes { get; set;}
    }
}
