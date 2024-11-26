using System.Server.Models;

namespace System.Server.IServices
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task AddOrder(Order order);
        Task UpdateOrder(Order order);  
        Task RemoveOrder(Order order);

    }
}
