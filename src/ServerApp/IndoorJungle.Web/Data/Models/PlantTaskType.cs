using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace IndoorJungle.Web.Data.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class PlantTaskType
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DateUpdated { get; set; }

        public List<PlantTask> PlantTasks { get; set; } = new List<PlantTask>();
    }
}
