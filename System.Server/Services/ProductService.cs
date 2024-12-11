using System.Server.Data;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace System.Server.Services
{
    public class ProductService : IProductService
    {
        private readonly SystemContext _context;

        public ProductService(SystemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }


        public async Task<Product> GetProductById(long id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            { 
                return product;
            }
            throw new KeyNotFoundException($"Product with ID {id} not found.");
        }

        public async Task CreateProduct(ProductDTO product)
        {
            var newProduct = new Product
            {
                Name = product.Name,
                Price = product.Price,
                DiscountId = product.DiscountId
            };
            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProduct(long id, ProductDTO product)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct != null)
            { 
                existingProduct.Name = product.Name;
                existingProduct.Price = product.Price;
                existingProduct.DiscountId = product.DiscountId;
            }
            await _context.SaveChangesAsync();
        }
        public async Task DeleteProduct(long id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}
