export class VotingResult {
    candidate: string
    totalVotes: number

    constructor(candidate: string, totalVotes: number) {
        this.candidate = candidate,
        this.totalVotes = totalVotes
    }
}