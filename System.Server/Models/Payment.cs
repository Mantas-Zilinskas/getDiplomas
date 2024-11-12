namespace System.Server.Models
{
    public class Payment
    {
        public enum PaymentMethod
        {
            Cash,
            CreditCard,
            GiftCard
        }
        public long Id { get; set; }
        public long OrderId { get; set; }
        public decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
    }
}
