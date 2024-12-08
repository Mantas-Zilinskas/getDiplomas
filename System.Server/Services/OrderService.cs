using System.Server.Data;
using System.Server.IServices;
using System.Server.Models;
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
            return await _context.Orders.FindAsync(id);
        }
        public async Task CreateOrder(Order order)
        {
            _context.Orders.Add(order);
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
