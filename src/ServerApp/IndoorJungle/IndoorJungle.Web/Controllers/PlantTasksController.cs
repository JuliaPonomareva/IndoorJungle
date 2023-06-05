using IndoorJungle.Web.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IndoorJungle.Web.Controllers
{
    [Authorize]
    public class PlantTasksController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PlantTasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: PlantTasks
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.PlantTasks.Include(p => p.Plant).Include(p => p.PlantTaskType).Include(p => p.User);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: PlantTasks/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.PlantTasks == null)
            {
                return NotFound();
            }

            var plantTask = await _context.PlantTasks
                .Include(p => p.Plant)
                .Include(p => p.PlantTaskType)
                .Include(p => p.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (plantTask == null)
            {
                return NotFound();
            }

            return View(plantTask);
        }

        // GET: PlantTasks/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.PlantTasks == null)
            {
                return NotFound();
            }

            var plantTask = await _context.PlantTasks
                .Include(p => p.Plant)
                .Include(p => p.PlantTaskType)
                .Include(p => p.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (plantTask == null)
            {
                return NotFound();
            }

            return View(plantTask);
        }
    }
}
