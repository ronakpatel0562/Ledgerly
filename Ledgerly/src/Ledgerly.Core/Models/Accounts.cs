namespace Ledgerly.Core.Models;

public class LedgerSummary
{
    public string Account { get; set; } = null!;
    public decimal Balance { get; set; }
}

public class BalanceSheet
{
    public int Id { get; set; }
    public decimal Assets { get; set; }
    public decimal Liabilities { get; set; }
    public decimal Equity { get; set; }
}

public class AccountsSummary
{
    public List<LedgerSummary> LedgerSummary { get; set; } = new();
    public BalanceSheet BalanceSheet { get; set; } = new();
}