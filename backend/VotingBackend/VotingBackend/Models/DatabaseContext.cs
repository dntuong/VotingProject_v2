using Microsoft.EntityFrameworkCore;

namespace VotingBackend.Models;

public class DatabaseContext : DbContext
{
    
    private readonly IConfiguration _configuration;

    public DatabaseContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public DbSet<Voting> votings { get; set; }
    public DbSet<Voter> voters { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");
        optionsBuilder.UseNpgsql(connectionString);
    }
    
    
    
}