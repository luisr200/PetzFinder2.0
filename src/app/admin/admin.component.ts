import { Component, OnInit } from '@angular/core';
import { FileService } from "../services/file.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _fileService: FileService) { }

  ngOnInit(): void {
  }

  downloadFiles(){
    this._fileService.getFile();
  }

}
