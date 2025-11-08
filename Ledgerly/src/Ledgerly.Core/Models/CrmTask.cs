namespace Ledgerly.Core.Models;

public class CrmTask
{
    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public DateTime Due { get; set; }
    public string Status { get; set; } = null!;
}