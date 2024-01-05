using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchApi.Data;
using WatchApi.InputModels;
using WatchApi.Models;

namespace WatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public WatchController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Watch
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WatchData>>> GetWatch()
        {
            return await _context.WatchData.ToListAsync();
        }

        // POST: api/Watch
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WatchIM>> PostWatch([FromBody] WatchIM watch)
        {
            WatchData data = new WatchData()
            {
                BPM = watch.BPM,
                Pressure = watch.Pressure,
                Light = watch.Light,
                Date = watch.Date
            };
            _context.WatchData.Add(data);
            await _context.SaveChangesAsync();

            return watch;
        }

        // DELETE: api/Watch
        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            try
            {
                _context.WatchData.RemoveRange(_context.WatchData);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
