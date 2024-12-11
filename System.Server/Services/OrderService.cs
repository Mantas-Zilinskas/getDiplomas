using System.Server.Data;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Server.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace System.Server.Services
{
    public class OrderService : IOrderService
    {

        private readonly SystemContext _context;
        public OrderService(SystemContext context)
        { 
            _context = context; 
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return await _context.Orders.ToListAsync();
        }
        public async Task<Order> GetOrderById(long id)
        {
            var order =  await _context.Orders.FindAsync(id);
            if (order != null)
            { 
                return order;
            }
            throw new KeyNotFoundException($"Order with ID {id} not found.");
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
            for (int i = 0; i < n; i++)
            {
                var orderProduct = new OrderProduct
                {
                    OrderId = newOrder.Id,
                    ProductId = order.Products[i].ProductId,
                    Quantity = order.Products[i].Quantity
                };
                _context.OrderProducts.Add(orderProduct);
            }
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateOrder(long id, Order order)
        {
            var existingOrder = await _context.Orders.FindAsync(id);
            if (existingOrder != null)
            {
                existingOrder.UserId = order.UserId;
                existingOrder.DiscountId = order.DiscountId;
                existingOrder.ReservationId = order.ReservationId;
                existingOrder.Tip = order.Tip;
                existingOrder.Status = order.Status;
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
            
        }
    }
}
