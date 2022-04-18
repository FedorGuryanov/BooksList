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

        private bool BookArchiveEntityExists(long id)
        {
            return _context.BookArchiveItems.Any(e => e.Id == id);
        }
    }
}
