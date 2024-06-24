using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingBackend.Models;

[Table("voter")]
public class Voter
{
    [Key]
    [Column("id")]
    public string id { get; set; }
    
    [Column("address_voter")]
    public string addressVoter { get; set; }
    
    [Column("list_vote")]
    public List<string> listVote { get; set; }
    
    [Column("voting_id")]
    public Voting votingId { get; set; }
}