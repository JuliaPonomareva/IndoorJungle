using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace IndoorJungle.Web.Data.Models
{
    public class User
    {
        [MaxLength(250)]
        public string Id { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DateUpdated { get; set; }

        public List<PlantTask> PlantTasks { get; set; } = new List<PlantTask>();
        public List<MyPlant> MyPlants { get; set; } = new List<MyPlant>();
    }
}
