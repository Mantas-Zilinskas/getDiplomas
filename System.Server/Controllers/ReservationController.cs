using Microsoft.AspNetCore.Mvc;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Text.Json;

namespace System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }
        [HttpGet]
        public async Task<IActionResult>GetAll()
        {
            var reservations = await _reservationService.GetAllReservations();
            return Ok(reservations);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReservationDTO reservation)
        {
            if (reservation == null)
            {
                BadRequest();
            }
            else
            {
                await _reservationService.CreateReservation(reservation);
            }
            return Ok();
        }
        [HttpGet("{reservationId}")]
        public async Task<IActionResult> GetById(int reservationId)
        {
            var reservation = await _reservationService.GetReservationById(reservationId);
            return Ok(reservation);
        }
        [HttpPut("{reservationId}")]
        public async Task<IActionResult> Put(int reservationId, [FromBody] ReservationDTO reservation)
        {
            await _reservationService.UpdateReservation(reservationId, reservation);
            return Ok();
        }
        [HttpDelete("{reservationId}")]
        public async Task<IActionResult> Delete(int reservationId)
        {
            await _reservationService.DeleteReservation(reservationId);
            return Ok();
        }

    }
}
