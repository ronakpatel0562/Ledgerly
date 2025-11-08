namespace Ledgerly.Core.Models;

public class Sale
{
    public string Id { get; set; } = null!;
    public string Customer { get; set; } = null!;
    public DateTime Date { get; set; }
    public decimal Total { get; set; }
    public string Status { get; set; } = null!;
}