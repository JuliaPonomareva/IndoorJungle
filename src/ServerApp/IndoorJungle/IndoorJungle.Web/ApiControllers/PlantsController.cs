using IndoorJungle.Web.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IndoorJungle.Web.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlantsController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/<UsersController>
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_context.Plants.Where(s => s.IsActive).ToList());
        }
    }
}
