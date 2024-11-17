﻿using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Server.Enums;

namespace System.Server.Models.DTO
{
    public class PaymentDTO
    {
        public int Id {  get; set; }
        public Decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
    }
}

//Payment:
//type: object
//properties:
//        id:
//type: integer
//amount:
//          type: number
//          format: float
//        method:
//          type: string
//          enum: [Cash, CreditCard, GiftCard]