using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingBackend.Models;

[Table("voting")]
public class Voting
{
    [Key]
    [Column("id")]
    public string id { get; set; }
    
    [Column("voting_name")]
    public string votingName { get; set; }
    
    [Column("total_votings")]
    public string totalVotings { get; set; }
    
    [Column("total_candidates")]
    public string totalCandidates { get; set; }
    
    [Column("max_votes")]
    public string maxVotes { get; set; }
    
    [Column("start_date")]
    public string startDate { get; set; }
    
    [Column("end_date")]
    public string endDate { get; set; }
    
    [Column("owner_address")]
    public string ownerAddress { get; set; }
    
    [System.Text.Json.Serialization.JsonIgnore]
    public ICollection<Voter> Votes { get; set; }

    public Voting() {
        Votes = new HashSet<Voter>();
    }
}