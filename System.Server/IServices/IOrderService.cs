using System.Server.Models;
using System.Server.Models.DTO;

namespace System.Server.IServices
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderGetDTO>> GetAllOrders();
        Task<OrderGetDTO> GetOrderById(long id);
        Task CreateOrder(OrderPostDTO order);
        Task UpdateOrder(long orderId, Order order);  
        Task DeleteOrder(long id);
        Task PayForOrder(long id, PaymentResponseDTO payment);
        decimal CalculateOrderPrice(List<OrderGetProductDTO> products);

    }
}
