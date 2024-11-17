using Microsoft.AspNetCore.Mvc;
using System.Server.Models.DTO;
using System.Text.Json;

namespace System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            /////////////////////////////////////////////////////////////////
            List<ProductDTO> list = new List<ProductDTO>();
            list.Add(new ProductDTO());
            list.Add(new ProductDTO());
            list.Add(new ProductDTO());
            string returnable = JsonSerializer.Serialize(list);

            return Ok(returnable);
        }

        [HttpGet("{productId}")]
        public IActionResult Get(int productId)
        {
            Console.WriteLine(productId);
            /////////////////////////////////////////////////////////////////
            var product = new ProductDTO();
            string returnable = JsonSerializer.Serialize(product);

            return Ok(returnable);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductDTO product)
        {
            string obj = JsonSerializer.Serialize(product);
            Console.WriteLine(obj);
            /////////////////////////////////////////////////////////////////

            return Ok(obj);
        }

        [HttpPut("{productId}")]
        public IActionResult Put(int productId,[FromBody] ProductDTO product)
        {
            string obj = JsonSerializer.Serialize(product);
            Console.WriteLine(productId);
            Console.WriteLine(obj);
            /////////////////////////////////////////////////////////////////

            return Ok(obj);
        }

        [HttpDelete("{productId}")]
        public IActionResult Delete(int productId)
        {
            Console.WriteLine(productId);
            /////////////////////////////////////////////////////////////////

            return Ok();
        }
    }
}
