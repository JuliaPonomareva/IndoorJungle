using IndoorJungle.Web.Data;
using IndoorJungle.Web.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IndoorJungle.Web.Controllers
{
    [Authorize]
    public class PlantTaskTypesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PlantTaskTypesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: PlantTaskTypes
        public async Task<IActionResult> Index()
        {
              return View(await _context.PlantTaskTypes.ToListAsync());
        }

        // GET: PlantTaskTypes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.PlantTaskTypes == null)
            {
                return NotFound();
            }

            var plantTaskType = await _context.PlantTaskTypes
                .FirstOrDefaultAsync(m => m.Id == id);
            if (plantTaskType == null)
            {
                return NotFound();
            }

            return View(plantTaskType);
        }

        // GET: PlantTaskTypes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PlantTaskTypes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name")] PlantTaskType plantTaskType)
        {
            if (ModelState.IsValid)
            {
                plantTaskType.DateCreated = DateTimeOffset.Now;
                plantTaskType.DateUpdated = DateTimeOffset.Now;
                _context.Add(plantTaskType);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(plantTaskType);
        }

        // GET: PlantTaskTypes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.PlantTaskTypes == null)
            {
                return NotFound();
            }

            var plantTaskType = await _context.PlantTaskTypes.FindAsync(id);
            if (plantTaskType == null)
            {
                return NotFound();
            }
            return View(plantTaskType);
        }

        // POST: PlantTaskTypes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name")] PlantTaskType plantTaskType)
        {
            if (id != plantTaskType.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var existing = await _context.PlantTaskTypes.FindAsync(id);
                    existing.Name = plantTaskType.Name;
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PlantTaskTypeExists(plantTaskType.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(plantTaskType);
        }

        private bool PlantTaskTypeExists(int id)
        {
          return _context.PlantTaskTypes.Any(e => e.Id == id);
        }
    }
}
