import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../environments/environment";
import * as L from "leaflet"
import { catchError, Observable, throwError } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  private apiUrl = environment.BACKEND_URL + '/mapas/';
  private map:any

  constructor(private http: HttpClient) {}

  setReferenceToMap(map:any) {
    this.map = map
  }

  addMarker(lat:number, lon:number, label = ""):void {
    if (this.map) {
      this.map.addMarker(lat, lon, label)
    }
  }

  searchByQuery(params: {
    query?: string
    lat?: number
    lon?: number
  }): Observable<any> {
    let url = this.apiUrl

    if (params.query) {
      url += '?q=${encodeURIComponent(params.query)}'
    } else if (params.lat !== undefined && params.lon !== undefined) {
      url += '?lat=${params.lat}&lon=${params.lon}'  
    } else {
      throw new Error("Debe proporcionar una 'query' o 'lat' y 'lon'")
    }

    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error("Error al buscar ubicaciones", error)
        return throwError(() => error)
      })
    )
  }
}