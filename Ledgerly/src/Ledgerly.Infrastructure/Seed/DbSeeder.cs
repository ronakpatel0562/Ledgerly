using Ledgerly.Core.Models;
using Ledgerly.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Ledgerly.Infrastructure.Seed;

public static class DbSeeder
{
    public static async Task SeedAsync(LedgerlyDbContext db)
    {
        // Favs
        if (!await db.FavMenuItems.AnyAsync())
        {
            var favs = new List<FavMenuItem>
            {
                new FavMenuItem{ Id = "purchase-bill", Title = "Purchase bill", Color = "teal", Page = "purchase" },
                new FavMenuItem{ Id = "deposit-receipt", Title = "Deposit receipt", Color = "green", Page = "accounts" },
                new FavMenuItem{ Id = "make-payment", Title = "Making a payment", Color = "yellow", Page = "accounts" },
                new FavMenuItem{ Id = "balance-sheet", Title = "Balance sheet", Color = "red", Page = "accounts" }
            };
            db.FavMenuItems.AddRange(favs);
        }

        // Purchases
        if (!await db.Purchases.AnyAsync())
        {
            var purchases = new List<Purchase>
            {
                new Purchase{ Id = "P-1001", Vendor = "Acme Supplies", Date = DateTime.ParseExact("2025-10-28", "yyyy-MM-dd", CultureInfo.InvariantCulture), Total = 1250.50m, Status = "Paid" },
                new Purchase{ Id = "P-1002", Vendor = "PaperWorks", Date = DateTime.ParseExact("2025-11-01", "yyyy-MM-dd", CultureInfo.InvariantCulture), Total = 560.00m, Status = "Due" }
            };
            db.Purchases.AddRange(purchases);
        }

        // Sales
        if (!await db.Sales.AnyAsync())
        {
            var sales = new List<Sale>
            {
                new Sale{ Id = "S-2001", Customer = "Green Mart", Date = DateTime.ParseExact("2025-10-30", "yyyy-MM-dd", CultureInfo.InvariantCulture), Total = 2300.00m, Status = "Paid" }
            };
            db.Sales.AddRange(sales);
        }

        // Ledger summaries
        if (!await db.LedgerSummaries.AnyAsync())
        {
            var ledger = new List<LedgerSummary>
            {
                new LedgerSummary{ Account = "Cash", Balance = 10234.50m },
                new LedgerSummary{ Account = "Bank", Balance = 45900.00m }
            };
            db.LedgerSummaries.AddRange(ledger);
        }

        // Balance sheet (single row)
        if (!await db.BalanceSheets.AnyAsync())
        {
            db.BalanceSheets.Add(new BalanceSheet{ Assets = 56134.5m, Liabilities = 12000.0m, Equity = 44134.5m });
        }

        // CRM
        if (!await db.CrmTasks.AnyAsync())
        {
            db.CrmTasks.Add(new CrmTask{ Id = "T-1", Title = "Call: Green Mart", Due = DateTime.ParseExact("2025-11-05", "yyyy-MM-dd", CultureInfo.InvariantCulture), Status = "open" });
        }

        // Settings
        if (!await db.Settings.AnyAsync())
        {
            db.Settings.Add(new Settings{ Company = "CELL POINT GENERAL TRADING LLC", Year = "2025-2026" });
        }

        await db.SaveChangesAsync();
    }
}
