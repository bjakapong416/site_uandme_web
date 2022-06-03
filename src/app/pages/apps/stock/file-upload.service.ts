import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    
  // API url
//   baseApiUrl = "http://128.199.86.71:8000"

  readonly baseApiUrl = `${environment.apiUrl}` ;

  constructor(private http:HttpClient) { }
  
  // Returns an observable
  upload(file:File):Observable<any> {
  
      // Create form data
      const formData = new FormData(); 

      
      // Store form name as "file" with file data
      formData.append("uploaded_file", file, file.name);
        
      // Make http post request over api
      // with formData as req
     console.log(this.baseApiUrl + "/addFile"); 
        

      return this.http.post(this.baseApiUrl + "/addFile", formData);
  }

  download():any {

    // const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/pdf',
    //       responseType : 'blob',
    //       Accept : 'application/pdf',
    //       observe : 'response'
    //     })
    //   };


    // Make http post request over api
    // with formData as req
        console.log("Downlaod");
        return this.http.get(this.baseApiUrl + "/getFile");
    }


    errorHandler(error: any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
    
        return throwError(errorMessage);
    }


}