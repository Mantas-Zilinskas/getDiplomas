using System.Server.Enums;

namespace System.Server.Models.DTO
{
    public class PaymentResponseDTO
{
        public Decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
    }
}
