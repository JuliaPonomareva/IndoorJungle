namespace IndoorJungle.Web.Data.Models
{
    public class PlantTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset DateProcessing { get; set; }
        public bool isActive { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DateUpdated { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int PlantId { get; set; }
        public Plant Plant { get; set; }

        public int PlantTaskTypeId { get; set; }
        public PlantTaskType PlantTaskType { get; set; }
    }
}
