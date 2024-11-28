using Microsoft.AspNetCore.Mvc;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Text.Json;

namespace System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetById(long productId)
        { 
            var product = await _productService.GetProductById(productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            await _productService.AddProduct(product);
            return Ok();
           
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> Put(long productId, [FromBody] ProductDTO productDto)
        {
            if (productDto == null || productId != productDto.Id)
            {
                return BadRequest(new { Message = "Invalid product data or mismatched ID." });
            }

            var existingProduct = await _productService.GetProductById(productId);
            if (existingProduct == null)
            {
                return NotFound(new { Message = $"Product with ID {productId} not found." });
            }

            existingProduct.Name = productDto.Name;
            existingProduct.Price = productDto.Price;
            existingProduct.Quantity = productDto.Quantity;

            await _productService.UpdateProduct(existingProduct);

            return Ok(new { Message = $"Product with ID {productId} updated successfully." });
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> Delete(long productId)
        {
            var product = await _productService.GetProductById(productId);
            if (product == null)
            {
                return NotFound(new { Message = $"Product with ID {productId} not found." });
            }

            await _productService.DeleteProduct(productId);
            return Ok(new { Message = $"Product with ID {productId} deleted successfully." });
        }
    }
}
