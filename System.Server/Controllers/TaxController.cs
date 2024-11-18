using Microsoft.AspNetCore.Mvc;
using System.Server.Models.DTO;
using System.Text.Json;

namespace System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            List<TaxDTO> list = new List<TaxDTO>();
            list.Add(new TaxDTO());
            list.Add(new TaxDTO());

            string returnable = JsonSerializer.Serialize(list);
            return Ok(returnable);
        }
        [HttpPost]
        public IActionResult Post([FromBody] TaxDTO tax)
        {
            string obj = JsonSerializer.Serialize(tax);
            Console.WriteLine(obj);

            return Ok(obj);
        }
        [HttpGet("{taxId}")]
        public IActionResult Get(int taxId)
        {   
            Console.WriteLine(taxId);
            var tax = new TaxDTO();
            string returnable = JsonSerializer.Serialize(tax);
            
            return Ok(returnable);
        }
        [HttpPut("{taxID}")]
        public IActionResult Put(int taxId, [FromBody] TaxDTO tax)
        {
            string obj = JsonSerializer.Serialize(tax);
            Console.WriteLine(taxId);
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
