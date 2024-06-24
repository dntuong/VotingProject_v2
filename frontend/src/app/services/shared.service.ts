import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  inputSource = new Subject<string>()
  input$ = this.inputSource.asObservable()

  constructor() { }

  sendInput(input: string) {
    this.inputSource.next(input)
  }
}
