using Microsoft.EntityFrameworkCore;

namespace IndoorJungle.Web.Data.Models
{
    [Index(nameof(UserId), nameof(PlantId), IsUnique = true)]
    public class MyPlant
    {
        public int Id { get; set; }
        public DateTimeOffset DateCreated { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int PlantId { get; set; }
        public Plant Plant { get; set; }
    }
}
