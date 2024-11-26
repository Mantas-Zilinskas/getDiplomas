using Microsoft.AspNetCore.Mvc;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Order order)
        {
            if (order == null)
            { return BadRequest(); }

            await _orderService.AddOrder(order);
            return Ok();
        }

        [HttpGet("{orderId}")]
        public IActionResult Get(int orderId)
        {
            Console.WriteLine(orderId);
            /////////////////////////////////////////////////////////////////
            var obj = new OrderDTO();
            string returnable = JsonSerializer.Serialize(obj);

            return Ok(returnable);
        }

        [HttpPut("{orderId}")]
        public IActionResult Put(int orderId, [FromBody] OrderUpdateDTO order)
        {
            Console.WriteLine(orderId);
            Console.WriteLine(JsonSerializer.Serialize(order));
            /////////////////////////////////////////////////////////////////

            return Ok();
        }

        [HttpDelete("{orderId}")]
        public IActionResult Delete(int orderId)
        {
            Console.WriteLine(orderId);
            /////////////////////////////////////////////////////////////////

            return Ok();
        }

        [HttpPost("{orderId}/Pay")]
        public IActionResult Post(int orderId, [FromBody] PaymentResponseDTO payment)
        {
            Console.WriteLine(orderId);
            Console.WriteLine(JsonSerializer.Serialize(payment));
            /////////////////////////////////////////////////////////////////
            var obj = new PaymentDTO();
            string returnable = JsonSerializer.Serialize(obj);

            return Ok(returnable);
        }
    }
}
