using System.Server.Enums;

namespace System.Server.Models.DTO
{
    public class PaymentResponseDTO
{
        public decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
    }
}
