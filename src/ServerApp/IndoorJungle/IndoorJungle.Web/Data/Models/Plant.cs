using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace IndoorJungle.Web.Data.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Plant
    {
        public int Id { get; set; }
        [MaxLength(500)]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DateUpdated { get; set; }

        public List<PlantTask> PlantTasks { get; set; } = new List<PlantTask>();
        public List<MyPlant> MyPlants { get; set; } = new List<MyPlant>();
    }
}
