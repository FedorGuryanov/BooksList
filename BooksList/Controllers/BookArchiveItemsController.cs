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
    [Route("api/archive/[controller]")]
    [ApiController]
    public class BookArchiveItemsController : ControllerBase
    {
        private readonly BooksArchiveContext _context;

        public BookArchiveItemsController(BooksArchiveContext context)
        {
            _context = context;
        }

        // GET: api/BookArchiveItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookArchiveEntity>>> GetBookArchiveItems()
        {
            return await _context.BookArchiveItems.ToListAsync();
        }

        // GET: api/BookArchiveItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<BookArchiveEntity>>> GetBookArchiveEntity(long id)
        {
            var archiveEntities = await _context.BookArchiveItems.Where(x => x.BookId == id).ToListAsync();

            if (archiveEntities == null)
            {
                return NotFound();
            }

            return archiveEntities;
        }

        //// PUT: api/BookArchiveItems/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutBookArchiveEntity(long id, BookArchiveEntity bookArchiveEntity)
        //{
        //    if (id != bookArchiveEntity.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(bookArchiveEntity).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!BookArchiveEntityExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/BookArchiveItems
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<BookArchiveEntity>> PostBookArchiveEntity(BookArchiveEntity bookArchiveEntity)
        //{
        //    _context.BookArchiveItems.Add(bookArchiveEntity);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetBookArchiveEntity), new { id = bookArchiveEntity.Id }, bookArchiveEntity);
        //}

        //// DELETE: api/BookArchiveItems/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteBookArchiveEntity(long id)
        //{
        //    var bookArchiveEntity = await _context.BookArchiveItems.FindAsync(id);
        //    if (bookArchiveEntity == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.BookArchiveItems.Remove(bookArchiveEntity);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool BookArchiveEntityExists(long id)
        {
            return _context.BookArchiveItems.Any(e => e.Id == id);
        }
    }
}
