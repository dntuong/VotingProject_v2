import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CHARACTER } from 'src/app/constant/character.constant';
import { KEY_ADDRESS } from 'src/app/constant/key.constant';
import { URL } from 'src/app/constant/url.constant';
import { Voting } from 'src/app/models/voting.model';

@Component({
  selector: 'app-edit-voting',
  templateUrl: './edit-voting.component.html',
  styleUrls: ['./edit-voting.component.scss']
})
export class EditVotingComponent {
  votingId?: string | null
  invalidVoting: boolean = false
  voting?: Voting

  candidateListString?: string
  addressListString?: string

  candidateList?: string[] = []
  addressList?: string[] = []

  hasDuplicateCandidate: boolean = false
  hasDuplicateAddress: boolean = false

  isOwner: boolean = true

  placeholderCandidate: string = 
  `Name A, Name B,... (separate by ,)
  or
  Name A
  Name B
  ...
  (separate by line)`
  placeholderAddress: string = 
  `Address A, Address B,... (separate by ,)
  or
  Address A
  Address B
  ...
  (separate by line)`

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isOwner = true
    this.votingId = this.route.snapshot.paramMap.get('votingId')
    this.voting = JSON.parse(sessionStorage.getItem(this.votingId!)!) as Voting
    if (this.voting === null) {
      this.invalidVoting = true
      return
    }
    if (sessionStorage.getItem(KEY_ADDRESS.CURRENT) !== sessionStorage.getItem(KEY_ADDRESS.OWNER)) {
      this.isOwner = false
      return
    }
    this.placeholderCandidate = this.preprocessPlaceholder(this.placeholderCandidate)
    this.placeholderAddress = this.preprocessPlaceholder(this.placeholderAddress)
  }

  changeCandidateList() {
    this.hasDuplicateCandidate = false
    this.candidateList = this.processListString(this.candidateListString)
    if (this.hasDuplicates(this.candidateList)) {
      this.hasDuplicateCandidate = true
    }
  }

  changeAddressList() {
    this.hasDuplicateAddress = false
    this.addressList = this.processListString(this.addressListString)
    this.addressList = this.addressList?.map(a => a.toLowerCase())
    if (this.hasDuplicates(this.addressList)) {
      this.hasDuplicateAddress = true
    }
  }

  submit() {
    const result = this.voting?.result
    for (let i = 0; i < result?.length!; i++) {
      result![i].candidate = this.candidateList![i]
    }
    sessionStorage.setItem(String(this.votingId), JSON.stringify(this.voting))
    localStorage.setItem(KEY_ADDRESS.VOTER_LIST, JSON.stringify(this.addressList))
    this.router.navigateByUrl(URL.MAIN + CHARACTER.SLASH + URL.HOME)
  }

  private preprocessPlaceholder(placeholder: string) {
    return placeholder.split('\n').map(line => line.trim()).join('\n')
  }

  private processListString(listString?: string) {
    let list = listString?.replaceAll("\n", ",").split(",")
    return list?.map(l => l = l.trim()).filter(l => l !== "")
  }

  private hasDuplicates(array?: string[]): boolean {
    return new Set(array).size !== array?.length;
}
}
