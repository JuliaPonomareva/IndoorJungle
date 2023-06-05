using IndoorJungle.Web.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IndoorJungle.Web.Controllers
{
    [Authorize]
    public class MyPlantsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MyPlantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: MyPlants
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.MyPlants.Include(m => m.Plant).Include(m => m.User);
            return View(await applicationDbContext.ToListAsync());
        }
    }
}
