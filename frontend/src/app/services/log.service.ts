import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = environment.BACKEND_URL + '/parcial/usuarios/';
  private logs: any[] = [];

  constructor(private http: HttpClient) {}
  
  getLog(): Observable<any[]> {
    let url = this.apiUrl;
    //Quiero ver la respuesta de la peticion
    
    return this.http.get<any[]>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
