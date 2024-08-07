import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-Description',
  templateUrl: './Description.component.html',
  // styleUrls: ['./Description.component.css']
})
export class DescriptionComponent implements OnInit {
  fileUploads?: any[];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log(fileUploads)
    });
  }
}
