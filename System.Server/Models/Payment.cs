using System.Globalization;
using System.Server.Enums;

namespace System.Server.Models
{
    public class Payment
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
    }
}
