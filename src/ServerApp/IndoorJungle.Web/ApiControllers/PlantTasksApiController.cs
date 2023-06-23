using IndoorJungle.Web.ApiModels;
using IndoorJungle.Web.Data;
using IndoorJungle.Web.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IndoorJungle.Web.ApiControllers
{
    [Route("api/planttasks")]
    [ApiController]
    public class PlantTasksApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlantTasksApiController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpGet("{userId}")]
        public IActionResult Get([FromRoute] string userId, [FromQuery] string filter)
        {
            var tasks = new List<TaskModel>();
            var query = _context.PlantTasks.Where(s => s.UserId == userId && s.DateProcessing >= DateTimeOffset.Now).AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(s => s.Name.Contains(filter) || s.Plant.Name.Contains(filter) || s.PlantTaskType.Name.Contains(filter));
            }
            tasks = query.OrderBy(s => s.DateProcessing).Select(s => new TaskModel
            {
                Id = s.Id,
                Name = s.Name,
                DateProcessing = s.DateProcessing,
                PlantId = s.Plant.Id,
                PlantName = s.Plant.Name,
                TypeId = s.PlantTaskType.Id,
                TypeName = s.PlantTaskType.Name,
                EventId = s.EventId
            }).ToList();

            return Ok(tasks);
        }

        [HttpPost("{userId}")]
        public IActionResult Create([FromRoute] string userId, TaskModel model)
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
            _context.PlantTasks.Add(new PlantTask
            {
                Name = model.Name,
                EventId= model.EventId,
                DateProcessing= model.DateProcessing,
                DateCreated= DateTimeOffset.Now,
                DateUpdated= DateTimeOffset.Now,
                PlantId = model.PlantId,
                PlantTaskTypeId = model.TypeId,
                UserId = userId
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{userId}/{taskId}")]
        public IActionResult Delete([FromRoute] string userId, [FromRoute] int taskId)
        {
            var task = _context.PlantTasks.FirstOrDefault(s => s.Id == taskId && s.UserId == userId);
            if (task != null)
            {
                _context.PlantTasks.Remove(task);
                _context.SaveChanges();
            }

            return Ok();
        }
    }
}
