using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BooksList.Models;

namespace BooksList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookItemsController : ControllerBase
    {
        private readonly BooksContext _context;
        private readonly BooksArchiveContext _archiveContext;

        public BookItemsController(BooksContext context, BooksArchiveContext archiveContext)
        {
            _context = context;
            _archiveContext = archiveContext;
        }

        // GET: api/BookEntities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookEntity>>> GetBookItems()
        {
            return await _context.BookItems.ToListAsync();
        }

        // GET: api/BookEntities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookEntity>> GetBookEntity(long id)
        {
            var bookEntity = await _context.BookItems.FindAsync(id);

            if (bookEntity == null)
            {
                return NotFound();
            }

            return bookEntity;
        }

        // PUT: api/BookEntities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookEntity(long id, BookEntity bookEntity)
        {
            if (id != bookEntity.Id)
            {
                return BadRequest();
            }

            var oldBookEntity = await _context.BookItems.FindAsync(id);
            _context.Entry(oldBookEntity).State = EntityState.Detached;

            if (oldBookEntity == null)
            {
                return NotFound();
            }

            var archiveItem = new BookArchiveEntity();
            archiveItem.PublishDate = oldBookEntity.PublishDate;
            archiveItem.Title = oldBookEntity.Title;
            archiveItem.Description = oldBookEntity.Description;
            archiveItem.Authors = oldBookEntity.Authors;
            archiveItem.ChangeDate = oldBookEntity.ChangeDate;
            archiveItem.BookId = oldBookEntity.Id;

            _archiveContext.BookArchiveItems.Add(archiveItem);
            await _archiveContext.SaveChangesAsync();

            bookEntity.ChangeDate = DateTime.UtcNow;
            _context.Entry(bookEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookEntities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookEntity>> PostBookEntity(BookEntity bookEntity)
        {
            bookEntity.ChangeDate = DateTime.UtcNow;
            _context.BookItems.Add(bookEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookEntity), new { id = bookEntity.Id }, bookEntity);
        }

        // DELETE: api/BookEntities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookEntity(long id)
        {
            var bookEntity = await _context.BookItems.FindAsync(id);
            if (bookEntity == null)
            {
                return NotFound();
            }

            var archiveEntities = await _archiveContext.BookArchiveItems.Where(x => x.BookId == id).ToListAsync();
            foreach (var archiveBook in archiveEntities)
            {
                _archiveContext.BookArchiveItems.Remove(archiveBook);
            }
            await _archiveContext.SaveChangesAsync();

            _context.BookItems.Remove(bookEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookEntityExists(long id)
        {
            return _context.BookItems.Any(e => e.Id == id);
        }
    }
}
