using System.Server.Models;
using System.Server.Models.DTO;

namespace System.Server.IServices
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<Product> GetProductById(long id);
        Task CreateProduct(ProductDTO product);
        Task UpdateProduct(long id, ProductDTO product);
        Task DeleteProduct(long id);

    }
}
