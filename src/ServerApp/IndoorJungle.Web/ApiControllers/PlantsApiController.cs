using IndoorJungle.Web.ApiModels;
using IndoorJungle.Web.Data;
using IndoorJungle.Web.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IndoorJungle.Web.ApiControllers
{
    [Route("api/plants")]
    [ApiController]
    public class PlantsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlantsApiController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpGet("{userId}")]
        public IActionResult Get([FromRoute] string userId, [FromQuery] string filter, [FromQuery] bool isMy = false)
        {
            var plants = new List<PlantModel>();
            var query = _context.Plants.OrderBy(s => s.Name).AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(s => s.Name.Contains(filter) || s.Description.Contains(filter));
            }
            if (isMy)
            {
                plants = query.Where(s => s.MyPlants.Any(x => x.UserId == userId)).Select(s => new PlantModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Image = s.Image,
                    IsMy = true,
                }).ToList();
            }
            else
            {
                plants = query.Where(s => s.IsActive).Select(s => new PlantModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Image = s.Image,
                    IsMy = s.MyPlants.Any(x => x.UserId == userId),
                }).ToList();
            }
            
            return Ok(plants);
        }

        [HttpPut("{userId}/{plantId}")]
        public IActionResult Add([FromRoute] string userId, [FromRoute] int plantId)
        {
            var myPlant = _context.MyPlants.FirstOrDefault(s => s.PlantId == plantId && s.UserId == userId);
            if (myPlant == null)
            {
                var user = _context.PlantUsers.FirstOrDefault(s => s.Id == userId);
                if (user == null)
                {
                    _context.PlantUsers.Add(new User
                    {
                        Id = userId,
                        DateCreated = DateTimeOffset.Now,
                        DateUpdated = DateTimeOffset.Now
                    });
                }
                _context.MyPlants.Add(new Data.Models.MyPlant
                {
                    PlantId = plantId,
                    UserId = userId,
                    DateCreated = DateTimeOffset.Now
                });
                _context.SaveChanges();
            }

            return Ok();
        }

        [HttpDelete("{userId}/{plantId}")]
        public IActionResult Delete([FromRoute] string userId, [FromRoute] int plantId)
        {
            var myPlant = _context.MyPlants.FirstOrDefault(s => s.PlantId == plantId && s.UserId == userId);
            if (myPlant != null)
            {
                _context.MyPlants.Remove(myPlant);
                _context.SaveChanges();
            }

            return Ok();
        }
    }
}
