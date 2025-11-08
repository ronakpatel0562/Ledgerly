using Ledgerly.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Ledgerly.Infrastructure.Data;

public class LedgerlyDbContext : DbContext
{
    public LedgerlyDbContext(DbContextOptions<LedgerlyDbContext> options)
        : base(options)
    {
    }

    public DbSet<FavMenuItem> FavMenuItems { get; set; }
    public DbSet<Purchase> Purchases { get; set; }
    public DbSet<Sale> Sales { get; set; }
    public DbSet<LedgerSummary> LedgerSummaries { get; set; }
    public DbSet<BalanceSheet> BalanceSheets { get; set; }
    public DbSet<CrmTask> CrmTasks { get; set; }
    public DbSet<Settings> Settings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // FavMenuItem configuration
        modelBuilder.Entity<FavMenuItem>()
            .HasKey(f => f.Id);

        // Purchase configuration
        modelBuilder.Entity<Purchase>()
            .HasKey(p => p.Id);
        modelBuilder.Entity<Purchase>()
            .Property(p => p.Total)
            .HasColumnType("decimal(18,2)");

        // Sale configuration
        modelBuilder.Entity<Sale>()
            .HasKey(s => s.Id);
        modelBuilder.Entity<Sale>()
            .Property(s => s.Total)
            .HasColumnType("decimal(18,2)");

        // LedgerSummary configuration
        modelBuilder.Entity<LedgerSummary>()
            .HasKey(l => l.Account);
        modelBuilder.Entity<LedgerSummary>()
            .Property(l => l.Balance)
            .HasColumnType("decimal(18,2)");

        // BalanceSheet configuration
        modelBuilder.Entity<BalanceSheet>()
            .HasKey(b => b.Id);
        modelBuilder.Entity<BalanceSheet>()
            .Property(b => b.Assets).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<BalanceSheet>()
            .Property(b => b.Liabilities).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<BalanceSheet>()
            .Property(b => b.Equity).HasColumnType("decimal(18,2)");

        // CrmTask configuration
        modelBuilder.Entity<CrmTask>()
            .HasKey(c => c.Id);

        // Settings configuration
        modelBuilder.Entity<Settings>()
            .HasKey(s => s.Company);
    }
}