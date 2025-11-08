using Ledgerly.Core.Models;
using Ledgerly.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ledgerly.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly LedgerlyDbContext _context;

    public SettingsController(LedgerlyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<Settings>> GetSettings()
    {
        var settings = await _context.Settings.FirstOrDefaultAsync();
        if (settings == null) return NotFound();
        return settings;
    }
}
