using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace BooksList.Models
{
    public class BooksContext : DbContext
    {
        public BooksContext(DbContextOptions<BooksContext> options)
            : base(options)
        {
        }

        public DbSet<BookEntity> BookItems { get; set; } = null!;
    }
}

