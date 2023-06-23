using IndoorJungle.Web.ApiModels;
using IndoorJungle.Web.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IndoorJungle.Web.ApiControllers
{
    [Route("api/planttasktypes")]
    [ApiController]
    public class PlantTaskTypesApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlantTaskTypesApiController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var tasktypes = _context.PlantTaskTypes.OrderBy(s => s.Name).Select(s => new PlantTaskTypeModel
            {
                Id = s.Id,
                Name = s.Name
            }).ToList();

            return Ok(tasktypes);
        }
    }
}
