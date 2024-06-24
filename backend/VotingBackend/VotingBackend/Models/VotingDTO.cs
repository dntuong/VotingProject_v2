namespace VotingBackend.Models;

public class VotingDTO
{
    public string votingName { get; set; }
    
    public string totalVotings { get; set; }
    
    public string totalCandidates { get; set; }
    
    public string maxVotes { get; set; }
    
    public string startDate { get; set; }
    
    public string endDate { get; set; }
    
    public string ownerAddress { get; set; }
}