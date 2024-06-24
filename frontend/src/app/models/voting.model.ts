import { VotingResult } from "./voting-result.model"

export class Voting {
    votingId!: number
    totalVoters!: number
    totalCandidates!: number
    maxVotesPerVoter!: number
    startTime!: string
    endTime!: string
    result?: VotingResult[]
}