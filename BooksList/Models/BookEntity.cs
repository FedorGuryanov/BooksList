using System;
namespace BooksList.Models
{
    public class BookEntity
    {
        public long Id { get; set; }
        public DateTime ChangeDate { get; set; }
        public string Title { get; set; }
        public DateTime PublishDate { get; set; }
        public string Description { get; set; }
        public string Authors { get; set; }
    }
}
