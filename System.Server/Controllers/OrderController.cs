using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Server.Services;
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
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _orderService.GetAllOrders();
            return Ok(orders);
        }
        [HttpGet("Unpaid")]
        public async Task<IActionResult> GetAllUnpaid()
        {
            var orders = await _orderService.GetAllUnpaidOrders();
            return Ok(orders);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OrderPostDTO order)
        {
            if (order == null)
            {
                return BadRequest(); 
            }

            await _orderService.CreateOrder(order);
            return Ok();
        }
        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetById(long orderId)
        {
            var order = await _orderService.GetOrderById(orderId);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }
        [HttpPut("{orderId}")]
        public async Task<IActionResult> Put(long orderId, [FromBody] OrderPostDTO order)
        {
            await _orderService.UpdateOrder(orderId, order);
            return Ok();
        }

        [HttpDelete("{orderId}")]
        public async Task<IActionResult> Delete(long orderId)
        {
            var existingOrder = await _orderService.GetOrderById(orderId);
            if (existingOrder == null)
            {
                return NotFound();
            }

            await _orderService.DeleteOrder(orderId);
            return Ok();
        }
        [HttpPost("{orderId}/Pay")]
        public async Task<IActionResult> Post(int orderId, [FromBody] PaymentResponseDTO payment)
        {
            await _orderService.PayForOrder(orderId, payment);

            return Ok();
        }
    }
}
