import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CHARACTER } from 'src/app/constant/character.constant';
import { KEY_ADDRESS } from 'src/app/constant/key.constant';
import { URL } from 'src/app/constant/url.constant';
import { VotingResult } from 'src/app/models/voting-result.model';
import { Voting } from 'src/app/models/voting.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilModule } from 'src/app/util/util.module';

@Component({
  selector: 'app-create-voting',
  templateUrl: './create-voting.component.html',
  // styleUrls: ['./create-voting.component.css']
})
export class CreateVotingComponent implements OnInit {
  votingId!: number

  votingForm!: FormGroup

  invalidMaxVotesPerVoter = false
  invalidEndTime = false

  isCreating: boolean = false

  numberOfVoting: number = 0

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilModule: UtilModule,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.numberOfVoting = sessionStorage.length
    this.createVoting()
  }

  createVoting() {
    // temp, it will be [(ID max in database) + 1]
    if (this.numberOfVoting === 0) {
      this.votingId = 1
    } else {
      this.votingId = 1 + this.getKeyIdMax()
    }
    // temp
    this.votingForm = this.formBuilder.group({
      totalVoters: [null, Validators.required],
      totalCandidates: [null, Validators.required],
      maxVotesPerVoter: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    })
    if (sessionStorage.getItem(KEY_ADDRESS.OWNER)) {
      this.numberOfVoting -= 2
    }
  }

  async doneCreating() {
    if (this.isCreating) {
      return
    }
    this.isCreating = true
    const voting: Voting = this.votingForm.value
    if (voting.totalCandidates <= voting.maxVotesPerVoter) {
      this.invalidMaxVotesPerVoter = true
      return
    }
    const startTime: Date = this.votingForm.controls['startTime'].value
    const endTime: Date = this.votingForm.controls['endTime'].value
    if (startTime > endTime) {
      this.invalidEndTime = true
      return
    }
    voting.votingId = this.votingId
    voting.startTime = this.formatDate(startTime)
    voting.endTime = this.formatDate(endTime)
    voting.result = []
    for (let i = 0; i < voting.totalCandidates; i++) {
      voting.result?.push({
        candidate: `Candidate ${i + 1}`,
        totalVotes: 0
      })
    }
    try {
      console.log("Voting:", voting)
      await this.createElection(Object.values(voting), startTime, endTime)
      sessionStorage.setItem(String(this.votingId), JSON.stringify(voting))
      this.router.navigateByUrl(URL.MAIN + CHARACTER.SLASH + URL.HOME)
    }
    catch (e) {
      console.error("Error sending contract method", e)
    }
    finally {
      this.isCreating = false
    }
  }

  cancelCreating() {
    this.votingForm.reset()
    // this.utilModule.sendContractMethod('totalElections')
    // test
    // this.apiService.getVotingList().subscribe((data) => {
    //   console.log(data)
    // })
    //
  }

  clearError() {
    this.invalidMaxVotesPerVoter = false
    this.invalidEndTime = false
  }

  private async createElection(arg: any[], startTime: Date, endTime: Date) {
    arg.splice(arg.length - 4, 4)
    arg.push(this.toSecond(startTime), this.toSecond(endTime))
    // await this.utilModule.sendContractMethod('createElection', ...arg)
    await this.utilModule.createVoting(arg)
  }

  private getKeyIdMax(): number {
    let keyIdMax = 0
    for (let i = 0; i < this.numberOfVoting; i++) {
      const key = Number(sessionStorage.key(i))
      if (key > keyIdMax) {
        keyIdMax = key
      }
    }
    return keyIdMax
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day}/${year} ${hour}:${minute}`;
  }

  private toSecond(date: Date): number {
    return Math.round(date.getTime() / 1000)
  }
}
