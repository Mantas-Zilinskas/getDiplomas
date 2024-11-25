using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.Json;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Text.Json;

namespace System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxController : ControllerBase
    {
        private readonly ITaxService _taxService;

        public TaxController(ITaxService taxService)
        { 
            _taxService = taxService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        { 
            var taxes = await _taxService.GetAllTaxes();
            return Ok(taxes);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Tax tax)
        {
            if (tax == null)
            {
                return BadRequest();
            }

            await _taxService.CreateTax(tax);
            return Ok();

        }
        [HttpGet("{taxId}")] // dont work yet
        public async Task<IActionResult> GetById(int id)
        { 
            var product = await _taxService.GetTaxById(id);
            if (product == null)
            { 
                return NotFound();
            }
            
            return Ok(product);
        }
        [HttpPut("{taxId}")]
        public IActionResult Put(int taxId, [FromBody] TaxDTO tax)
        {
            Console.WriteLine(taxId);
            string obj = JsonSerializer.Serialize(tax);
            Console.WriteLine(obj);

            return Ok(obj);
        }
        [HttpDelete("{taxId}")]
        public IActionResult Delete(int taxId)
        {
            Console.WriteLine(taxId);
            var tax = new TaxDTO();
            string returnable = JsonSerializer.Serialize(tax);

            return Ok(returnable);
        }

    }
}
