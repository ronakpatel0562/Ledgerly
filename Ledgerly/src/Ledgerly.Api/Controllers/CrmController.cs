using Ledgerly.Core.Models;
using Ledgerly.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ledgerly.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CrmController : ControllerBase
{
    private readonly LedgerlyDbContext _context;

    public CrmController(LedgerlyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CrmTask>>> GetTasks()
    {
        return await _context.CrmTasks.ToListAsync();
    }
}
