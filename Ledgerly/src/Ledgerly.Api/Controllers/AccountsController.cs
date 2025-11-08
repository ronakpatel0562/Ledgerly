using Ledgerly.Core.Models;
using Ledgerly.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ledgerly.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly LedgerlyDbContext _context;

    public AccountsController(LedgerlyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<AccountsSummary>> GetAccounts()
    {
        var ledger = await _context.LedgerSummaries.ToListAsync();
        var balance = await _context.BalanceSheets.FirstOrDefaultAsync();

        var result = new AccountsSummary
        {
            LedgerSummary = ledger,
            BalanceSheet = balance ?? new BalanceSheet()
        };

        return result;
    }
}
