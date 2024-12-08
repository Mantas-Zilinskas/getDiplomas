using System.Server.Models;

namespace System.Server.IServices
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task<Order> GetOrderById(long id);
        Task CreateOrder(Order order);
        Task UpdateOrder(long orderId, Order order);  
        Task DeleteOrder(long id);

    }
}
