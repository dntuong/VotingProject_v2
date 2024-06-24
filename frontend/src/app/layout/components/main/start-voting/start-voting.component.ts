import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CHARACTER } from 'src/app/constant/character.constant';
import { KEY_ADDRESS } from 'src/app/constant/key.constant';
import { URL } from 'src/app/constant/url.constant';
import { Voting } from 'src/app/models/voting.model';

@Component({
  selector: 'app-start-voting',
  templateUrl: './start-voting.component.html',
  styleUrls: ['./start-voting.component.scss']
})
export class StartVotingComponent {
  votingId?: string | null
  invalidVoting: boolean = false
  voting?: Voting

  isVoter: boolean = true

  candidates = [
    { name: 'Option 1', selected: false }
  ];
  maxVotesPerVoter?: number
  votedCandidates: number = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isVoter = true
    this.votingId = this.route.snapshot.paramMap.get('votingId')
    this.voting = JSON.parse(sessionStorage.getItem(this.votingId!)!) as Voting
    if (this.voting === null) {
      this.invalidVoting = true
      return
    }
    const voterList = JSON.parse(localStorage.getItem(KEY_ADDRESS.VOTER_LIST)!) as string[]
    if (!voterList || !voterList.includes(sessionStorage.getItem(KEY_ADDRESS.CURRENT)!)) {
      this.isVoter = false
      return
    }
    this.maxVotesPerVoter = this.voting.maxVotesPerVoter
    this.candidates.splice(0)
    for (const candidateInfo of this.voting.result!) {
      this.candidates.push({
        name: candidateInfo.candidate,
        selected: false
      })
    }
  }

  selectCandidate(candidate: any) {
    if (!candidate.selected && this.votedCandidates === this.maxVotesPerVoter) {
      return
    }
    candidate.selected = !candidate.selected
    this.votedCandidates += candidate.selected ? 1 : -1
  }

  submit() {
    const votedList = this.candidates.filter(c => c.selected === true)
    for (const votedC of votedList) {
      const candidateResult = this.voting?.result?.find(c => c.candidate === votedC.name)
      candidateResult!.totalVotes += 1
    }
    sessionStorage.setItem(String(this.votingId), JSON.stringify(this.voting))
    this.router.navigateByUrl(URL.MAIN + CHARACTER.SLASH + URL.RESULT_VOTING)
  }
}
