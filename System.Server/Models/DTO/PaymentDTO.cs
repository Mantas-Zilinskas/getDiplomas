using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Server.Enums;

namespace System.Server.Models.DTO
{
    public class PaymentDTO
    {
        public long Id {  get; set; }
        public decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
    }
}