using Microsoft.AspNetCore.Mvc;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Text.Json;

namespace System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            List<ReservationDTO> list = new List<ReservationDTO>();
            list.Add(new ReservationDTO());
            list.Add(new ReservationDTO());

            string returnable = JsonSerializer.Serialize(list);
            return Ok(returnable);
        }
        [HttpPost]
        public IActionResult Post([FromBody] ReservationDTO reservation)
        {
            string obj = JsonSerializer.Serialize(reservation);
            Console.WriteLine(obj);

            return Ok(obj);
        }
        [HttpGet("{reservationId}")]
        public IActionResult Get(int reservationId)
        {
            Console.WriteLine(reservationId);
            var reservation = new ReservationDTO();
            string returnable = JsonSerializer.Serialize(reservation);

            return Ok(returnable);
        }
        [HttpPut("{reservationId}")]
        public IActionResult Put(int reservationId, [FromBody] ReservationDTO reservation)
        {
            string obj = JsonSerializer.Serialize(reservation);
            Console.WriteLine(reservationId);
            Console.WriteLine(obj);

            return Ok(obj);
        }
        [HttpDelete("{reservationId}")]
        public IActionResult Delete(int reservationId)
        {
            Console.WriteLine(reservationId);
            var reservation = new ReservationDTO();
            string returnable = JsonSerializer.Serialize(reservation);

            return Ok(returnable);
        }

    }
}
