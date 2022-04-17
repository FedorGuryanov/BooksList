using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace BooksList.Models
{
    public class BooksArchiveContext : DbContext
    {
        public BooksArchiveContext(DbContextOptions<BooksArchiveContext> options)
            : base(options)
        {
        }

        public DbSet<BookArchiveEntity> BookArchiveItems { get; set; } = null!;
    }
}
