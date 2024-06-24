import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CHARACTER } from 'src/app/constant/character.constant';
import { KEY_ADDRESS } from 'src/app/constant/key.constant';
import { URL } from 'src/app/constant/url.constant';
import { Voting } from 'src/app/models/voting.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slash: string = CHARACTER.SLASH
  startVotingURL: string = this.slash + URL.MAIN + this.slash + URL.START_VOTING + this.slash
  editVotingURL: string = this.slash + URL.MAIN + this.slash + URL.EDIT_VOTING + this.slash
  
  numberOfVoting: number = 0
  votingList: Voting[] = []

  searchId: string = ""
  subscription!: Subscription
  numberOfVotingOnSearch: number = 0
  votingListOnSearch: Voting[] = []

  isOwner: boolean = true

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.isOwner = true
    if (sessionStorage.getItem(KEY_ADDRESS.CURRENT) !== sessionStorage.getItem(KEY_ADDRESS.OWNER)) {
      this.isOwner = false
    }

    this.numberOfVoting = sessionStorage.length
    for (let i = 0; i < this.numberOfVoting; i++) {
      const key = sessionStorage.key(i)
      if (key === "owner" || key === "current") {
        continue
      }
      const voting = JSON.parse(sessionStorage.getItem(key!)!) as Voting
      this.votingList.push(voting)
    }
    this.votingList.sort((a, b) => b.votingId - a.votingId)

    // search voting id
    this.subscription = this.sharedService.input$.subscribe(input => {
      this.searchId = input
      this.votingListOnSearch = []
      this.numberOfVotingOnSearch = 0
      if (this.searchId === "") {
        return
      }
      for (let i = 0; i < this.votingList.length; i++) {
        const key = this.votingList[i].votingId.toString()
        if (key?.includes(this.searchId)) {
          const voting = this.votingList[i]
          this.votingListOnSearch.push(voting)
        }
      }
      this.votingListOnSearch.sort((a, b) => b.votingId - a.votingId)
      this.numberOfVotingOnSearch = this.votingListOnSearch.length
    })

    if (sessionStorage.getItem(KEY_ADDRESS.OWNER)) {
      this.numberOfVoting -= 2
    }
  }

}
