using System.Server.Models;
using System.Server.Models.DTO;

namespace System.Server.IServices
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task<Order> GetOrderById(long id);
        Task CreateOrder(OrderPostDTO order);
        Task UpdateOrder(long orderId, Order order);  
        Task DeleteOrder(long id);

    }
}
