namespace IndoorJungle.Web.ApiModels
{
    public class TaskModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset DateProcessing { get; set; }
        public int PlantId { get; set; }
        public string PlantName { get; set; }
        public int TypeId { get; set; }
        public string TypeName { get; set; }
        public string EventId { get; set; }
    }
}
