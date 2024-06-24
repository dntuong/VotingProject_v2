import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KEY_ADDRESS } from 'src/app/constant/key.constant';
import { VotingResult } from 'src/app/models/voting-result.model';
import { Voting } from 'src/app/models/voting.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-result-voting',
  templateUrl: './result-voting.component.html',
  styleUrls: ['./result-voting.component.scss']
})
export class ResultVotingComponent implements OnInit {
  voting: Voting;
  data: any;
  options: any;
  numberOfVoting: number = 0

  searchId: string = ""
  subscription!: Subscription
  votingOnSearch: Voting;
  dataOnSearch: any;
  optionsOnSearch: any;
  

  constructor(
    private sharedService: SharedService
  ) { 
    this.voting = {
      votingId: 999,
      totalVoters: 1000,
      totalCandidates: 5,
      maxVotesPerVoter: 3,
      startTime: '2024-04-01T08:00:00',
      endTime: '2024-04-02T20:00:00',
      result: [
          { candidate: "1", totalVotes: 30 },
          { candidate: "2", totalVotes: 25 },
          { candidate: "3", totalVotes: 10 },
          { candidate: "4", totalVotes: 15 },
          { candidate: "5", totalVotes: 20 }
      ]
    };
    this.votingOnSearch = JSON.parse(JSON.stringify(this.voting))

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [540, 325, 702],
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
      ]
    };
    this.dataOnSearch = JSON.parse(JSON.stringify(this.data))

    this.options = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor
              }
          }
      }
    };
    this.optionsOnSearch = JSON.parse(JSON.stringify(this.options))
  }

  ngOnInit() {
    this.numberOfVoting = sessionStorage.length
    if (this.numberOfVoting === 0) {
      return
    }
    // temp, get the lasted voting id
    let lastedVotingId = 0
    for (let i = 0; i < this.numberOfVoting; i++) {
      const key = Number(sessionStorage.key(i))
      if (key > lastedVotingId) {
        lastedVotingId = key
      }
    }
    // temp
    this.voting = JSON.parse(sessionStorage.getItem(lastedVotingId.toString())!) as Voting
    const labels: string[] = []
    const data: number[] = []
    for (const candidateInfo of this.voting.result!) {
      labels.push(candidateInfo.candidate)
      data.push(candidateInfo.totalVotes)
    }
    this.data.labels = labels
    this.data.datasets[0].data = data

    // search for id
    this.subscription = this.sharedService.input$.subscribe(result => {
      this.searchId = result
      this.votingOnSearch = JSON.parse(sessionStorage.getItem(this.searchId)!) as Voting
      if (this.votingOnSearch === null) {
        return
      }
      const labelsOnSearch: string[] = []
      const dataOnSearch: number[] = []
      for (const candidateInfo of this.votingOnSearch.result!) {
        labelsOnSearch.push(candidateInfo.candidate)
        dataOnSearch.push(candidateInfo.totalVotes)
      }
      this.dataOnSearch.labels = labelsOnSearch
      this.dataOnSearch.datasets[0].data = dataOnSearch
    })
    if (sessionStorage.getItem(KEY_ADDRESS.OWNER)) {
      this.numberOfVoting -= 2
    }
  }

}
