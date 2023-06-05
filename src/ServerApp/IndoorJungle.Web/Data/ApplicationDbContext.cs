using IndoorJungle.Web.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IndoorJungle.Web.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> PlantUsers { get; set; }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<MyPlant> MyPlants { get; set; }
        public DbSet<PlantTask> PlantTasks { get; set; }
        public DbSet<PlantTaskType> PlantTaskTypes { get; set;}
    }
}