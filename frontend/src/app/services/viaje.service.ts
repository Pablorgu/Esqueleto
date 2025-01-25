import { Injectable } from "@angular/core"
import { environment as env } from "../../environments/environment"
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: "root",
  })
export class ViajeService {
    private apiUrl = `${env.BACKEND_URL}/viajes/`

    constructor(private http: HttpClient) {}

    getViajes(): any {
        return this.http.get(this.apiUrl)
    }

    getViajesByEmail(email: string): any {
        return this.http.get(`${this.apiUrl}${email}`)
    }

    createViaje(viajeData: any): any {
        return this.http.post(this.apiUrl, viajeData)
    }
}
