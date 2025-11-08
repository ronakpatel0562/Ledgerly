using Ledgerly.Core.Models;
using Ledgerly.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ledgerly.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FavsController : ControllerBase
{
    private readonly LedgerlyDbContext _context;

    public FavsController(LedgerlyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FavMenuItem>>> GetFavs()
    {
        return await _context.FavMenuItems.ToListAsync();
    }
}