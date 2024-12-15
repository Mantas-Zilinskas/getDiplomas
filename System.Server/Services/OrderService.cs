using System.Server.Data;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Server.Enums;
using Microsoft.EntityFrameworkCore;

namespace System.Server.Services
{
    public class OrderService : IOrderService
    {

        private readonly SystemContext _context;
        public OrderService(SystemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderGetDTO>> GetAllOrders()
        {
            var orders = await _context.Orders.ToListAsync();
            var orderList = new List<OrderGetDTO>();
            foreach (var o in orders)
            {
                orderList.Add(await GetOrderById(o.Id));
            }
            return orderList;
        }
        public async Task<IEnumerable<OrderGetDTO>> GetAllUnpaidOrders()
        {
            var orders = await _context.Orders
                .Where(o => o.Status == OrderStatus.Open)
                .ToListAsync();
            var orderList = new List<OrderGetDTO>();
            foreach (var o in orders)
            {
                orderList.Add(await GetOrderById(o.Id));
            }
            return orderList;
        }
        public async Task<OrderGetDTO> GetOrderById(long id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                throw new KeyNotFoundException($"Order with ID {id} not found.");
            }
            var newOrder = new OrderGetDTO
            {
                Id = order.Id,
                Status = order.Status,
                Tip = order.Tip,
                ReservationId = order.ReservationId
            };

            // Find order Products
            var orderProducts = await _context.OrderProducts
                .Where(op => op.OrderId == order.Id)
                .ToListAsync();

            var newProducts = new List<OrderGetProductDTO>();

            foreach (var op in orderProducts)
            {
                var product = await _context.Products
                .FindAsync(op.ProductId);
                if (product != null)
                {
                    newProducts.Add(new OrderGetProductDTO
                    {
                        Id = product.Id,
                        Name = product.Name,
                        Price = product.Price,
                        Quantity = op.Quantity,
                        DiscountId = product.DiscountId
                    });
                }
            }

            // Find order Payments
            var orderPayments = await _context.Payments
                .Where(p => p.OrderId == order.Id)
                .ToListAsync();

            var newPayments = new List<PaymentDTO>();

            foreach (var op in orderPayments)
            {
                var payment = await _context.Payments
                    .FindAsync(op.Id);
                if (payment != null)
                {
                    newPayments.Add(new PaymentDTO
                    {
                        Id = payment.Id,
                        Amount = payment.Amount,
                        Method = payment.Method,
                    });
                }
            }

            newOrder.Products = newProducts;
            newOrder.Payments = newPayments;

            return newOrder;
        }
        public async Task CreateOrder(OrderPostDTO order)
        {
            var newOrder = new Order
            {
                UserId = order.UserId,
                DiscountId = order.DiscountId,
                ReservationId = order.ReservationId,
                Tip = order.Tip,
                Status = OrderStatus.Open
            };
            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            var n = order.Products.Count;
            foreach (var p in order.Products)
            {
                var orderProduct = new OrderProduct
                {
                    OrderId = newOrder.Id,
                    ProductId = p.ProductId,
                    Quantity = p.Quantity
                };
                _context.OrderProducts.Add(orderProduct);
            }
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrder(long id, OrderUpdateDTO order)
        {
            //todo
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                //_context.Orders.Remove(order);
                order.Status = OrderStatus.Canceled;
                await _context.SaveChangesAsync();
            }
        }
        public async Task PayForOrder(long id, PaymentResponseDTO payment)
        {
            var order = await GetOrderById(id);
            var orderPrice = CalculateOrderPrice(order.Products);
            if (payment.Amount == orderPrice)
            {
                var paymentOrder = await _context.Orders.FindAsync(order.Id);
                if (paymentOrder != null)
                {
                    paymentOrder.Status = OrderStatus.Closed;
                    _context.Payments.Add(new Payment
                    {
                        OrderId = order.Id,
                        Amount = payment.Amount,
                        Method = payment.Method
                    });
                }
            }
            await _context.SaveChangesAsync();
        }
        public decimal CalculateOrderPrice(List<OrderGetProductDTO> products)
        {
            decimal sum = 0;
            foreach (var product in products)
            {
                sum += product.Price;
            }
            return sum;
        }
    }
}
