using Ledgerly.Core.Models;
using Ledgerly.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ledgerly.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PurchaseController : ControllerBase
{
    private readonly LedgerlyDbContext _context;

    public PurchaseController(LedgerlyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Purchase>>> GetPurchases()
    {
        return await _context.Purchases.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Purchase>> GetPurchase(string id)
    {
        var purchase = await _context.Purchases.FindAsync(id);
        if (purchase == null)
        {
            return NotFound();
        }
        return purchase;
    }

    [HttpPost]
    public async Task<ActionResult<Purchase>> CreatePurchase(Purchase purchase)
    {
        _context.Purchases.Add(purchase);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPurchase), new { id = purchase.Id }, purchase);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePurchase(string id, Purchase purchase)
    {
        if (id != purchase.Id)
        {
            return BadRequest();
        }

        _context.Entry(purchase).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}