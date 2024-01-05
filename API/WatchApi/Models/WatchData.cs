using System.ComponentModel.DataAnnotations;

namespace WatchApi.Models
{
    public class WatchData
    {
        [Key]
        public int Id { get; set; }
        public string BPM { get; set; }
        public string Pressure { get; set; }
        public string Light { get; set; }
        public DateTime Date { get; set; }
    }
}
