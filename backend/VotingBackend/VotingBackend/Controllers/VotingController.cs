using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VotingBackend.Models;

namespace VotingBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class VotingController
{
    private readonly DatabaseContext _databaseContext;

    public VotingController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<IEnumerable<Voting>>> GetVoting()
    {
        return await _databaseContext.votings.ToListAsync();
    }
    
    [HttpPost("[action]")]
    public async Task<ActionResult<bool>> CreateVoting([FromBody]VotingDTO? votingDto)
    {
        if (votingDto != null)
        {
            Voting voting = new Voting();

            voting.id = Guid.NewGuid().ToString();
            voting.votingName = votingDto.votingName;
            voting.totalVotings = votingDto.totalVotings;
            voting.totalCandidates = votingDto.totalCandidates;
            voting.maxVotes = votingDto.maxVotes;
            voting.startDate = votingDto.startDate;
            voting.endDate = votingDto.endDate;
            voting.ownerAddress = votingDto.ownerAddress;

            _databaseContext.votings.Add(voting);

            await _databaseContext.SaveChangesAsync();

            return true;
        }
        return false;
    }

    [HttpPost("[action]/{prId}")]
    public async Task<ActionResult<bool>> UpdateVoting([FromRoute]string prId,[FromBody]VotingDTO? votingDto)
    {
        if (prId != null && votingDto != null)
        {
            Voting curVoting = _databaseContext.votings.Find(prId);

            if (curVoting != null)
            {
                // Update properties
                curVoting.votingName = votingDto.votingName;
                curVoting.totalVotings = votingDto.totalVotings;
                curVoting.totalCandidates = votingDto.totalCandidates;
                curVoting.maxVotes = votingDto.maxVotes;
                curVoting.startDate = votingDto.startDate;
                curVoting.endDate = votingDto.endDate;
                curVoting.ownerAddress = votingDto.ownerAddress;

                await _databaseContext.SaveChangesAsync();

                return true;
            }
        }
        return false;
    }
}