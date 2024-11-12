namespace System.Server.Models.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public int OrderID { get; set; }
        public string Name { get; set; }
        public Decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
