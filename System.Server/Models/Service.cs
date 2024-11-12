namespace System.Server.Models
{
    public class Service
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Charge { get; set; }
        public TimeSpan Duration { get; set; }
    }
}
