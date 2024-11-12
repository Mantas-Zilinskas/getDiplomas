namespace System.Server.Models
{
    public class Order
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long DiscountId { get; set; }
        public long ReservationId { get; set; }
        public decimal Tip { get; set; }
        public string Status { get; set; }

        public decimal GetFinalCost()
        { return 0; }
    }
}
