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
        [HttpGet("Active")]
        public async Task<IActionResult> GetActive()
        {
            var products = await _productService.GetAllActiveProducts();
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductDTO product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            await _productService.CreateProduct(product);
            return Ok();
           
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> Put(long productId, [FromBody] ProductDTO product)
        {
            await _productService.UpdateProduct(productId, product);
            return Ok(product);
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
