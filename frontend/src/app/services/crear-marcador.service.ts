import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrearMarcadorService {
  private apiUrl = environment.BACKEND_URL + "/marcadores/";
  constructor(private http: HttpClient) {}

  crearMarcador(marcadorData: any): Observable<any> {
    console.log("URL de la API: ", this.apiUrl);
    const email = sessionStorage.getItem('email');
    if (email) {
      marcadorData.email = email;
    }
    console.log(marcadorData);
     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl,marcadorData,{headers});
  }
}
