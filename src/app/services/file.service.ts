import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = environment.apiEnpoint;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }


  getFile() {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/zip');
    this.http.get(url + '/qr/unprintedtags', {responseType:'arraybuffer'})
    .subscribe(s => {
      console.log(s)
      this.downloadFile(s)
      //console.log(decodeURIComponent(s['body'])) 
      //this.downloadFile(this.decodeFile(s['body']))
       
      });
  }

  decodeFile(file: string){
    return decodeURIComponent(file);
  }

  downloadFile(data: any) {
    const blob = new Blob([data], {type: "application/zip"});
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
