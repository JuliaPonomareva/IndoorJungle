using IndoorJungle.Web.Data;
using IndoorJungle.Web.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IndoorJungle.Web.Controllers
{
    [Authorize]
    public class PlantsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public PlantsController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: Plants
        public async Task<IActionResult> Index()
        {
              return View(await _context.Plants.ToListAsync());
        }

        // GET: Plants/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Plants == null)
            {
                return NotFound();
            }

            var plant = await _context.Plants
                .FirstOrDefaultAsync(m => m.Id == id);
            if (plant == null)
            {
                return NotFound();
            }

            return View(plant);
        }

        // GET: Plants/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Plants/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,Description,IsActive")] Plant plant, IFormFile file)
        {
            if (ModelState.IsValid)
            {
                if (file != null)
                {
                    plant.Image = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                    using var stream = new FileStream(Path.Combine(_env.WebRootPath, "images", plant.Image), FileMode.CreateNew, FileAccess.Write);
                    await file.CopyToAsync(stream);
                }
                
                plant.DateCreated = DateTimeOffset.Now;
                plant.DateUpdated = DateTimeOffset.Now;
                _context.Add(plant);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(plant);
        }

        // GET: Plants/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Plants == null)
            {
                return NotFound();
            }

            var plant = await _context.Plants.FindAsync(id);
            if (plant == null)
            {
                return NotFound();
            }
            return View(plant);
        }

        // POST: Plants/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description,IsActive")] Plant plant, IFormFile file)
        {
            if (id != plant.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    if (file != null)
                    {
                        plant.Image = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                        using var stream = new FileStream(Path.Combine(_env.WebRootPath, "images", plant.Image), FileMode.CreateNew, FileAccess.Write);
                        await file.CopyToAsync(stream);
                    }

                    var existing = await _context.Plants.FindAsync(id);
                    existing.Name = plant.Name;
                    existing.Description = plant.Description;
                    existing.IsActive = plant.IsActive;
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PlantExists(plant.Id))
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
            return View(plant);
        }

        // GET: Plants/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Plants == null)
            {
                return NotFound();
            }

            var plant = await _context.Plants
                .FirstOrDefaultAsync(m => m.Id == id);
            if (plant == null)
            {
                return NotFound();
            }

            return View(plant);
        }

        // POST: Plants/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Plants == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Plants'  is null.");
            }
            var plant = await _context.Plants.FindAsync(id);
            if (plant != null)
            {
                _context.Plants.Remove(plant);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PlantExists(int id)
        {
          return _context.Plants.Any(e => e.Id == id);
        }
    }
}
