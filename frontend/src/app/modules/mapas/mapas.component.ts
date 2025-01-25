import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import * as L from "leaflet"
import { MapasService } from "../../services/mapas.service"
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms"

@Component({
  standalone: true,
  selector: "app-mapas",
  imports: [ReactiveFormsModule],
  templateUrl: "./mapas.component.html",
})
export class MapasComponent implements OnInit {
  @Input()
  mostrarBusqueda = false
  @Output()
  mapaCreated = new EventEmitter<string>()
  private lastMarker: {lat: number, lon: number; label?: string} | undefined
  private mapa: L.Map | undefined

  constructor(
    private mapasService: MapasService,
    private fb: FormBuilder
  ) { }

  ngOnInit():void {
    this.mapasService.setReferenceToMap(this)
    this.mapa = L.map("map").setView([39.3260685, -4,8379791], 5)

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
  }).addTo(this.mapa)
  }

  addMarker(lat: number, lon: number, label = ""): void {
    if (this.mapa) {
      const myIcon = L.icon({
        iconUrl: "/marker-icon.png",
        shadowUrl: "/marker-shadow.png",
        iconAnchor: [0,0],
        iconSize: [25, 41],
      })

      if(label) {
        L.marker([lat, lon], {icon: myIcon}).addTo(this.mapa).bindPopup(label)
      } else {
        L.marker([lat, lon], {icon: myIcon}).addTo(this.mapa)
      }
    }
  }

  createAndFocusMarker(lat: number, lon: number, label = ""): void {
    if (this.mapa) {
      this.addMarker(lat, lon, label)
      this.mapa.setView([lat, lon], 13)
    }
  }

  focusOnPosition(lat: number, lon: number): void {
    if (this.mapa) {
      this.mapa.setView([lat, lon], 13)
    }
  }

  buscar(inputValue: string): void {
    if (this.esCoordenadas(inputValue)) {
      const [lat, lon] = inputValue
        .split(",")
        .map((coord) => parseFloat(coord.trim()))
      this.mapasService.searchByQuery({ lat, lon }).subscribe((response) => {
        const coords = response.data
        if (coords) {
          this.createAndFocusMarker(coords.lat, coords.lon, coords.name)
          console.log(coords)
          this.lastMarker = {
            lat: coords.lat,
            lon: coords.lon,
            label: coords.name,
          }
          console.log(this.lastMarker)
        }
      })
    } else {
      this.mapasService
        .searchByQuery({ query: inputValue })
        .subscribe((response) => {
          const coords = response.data
          if (coords) {
            this.createAndFocusMarker(coords.lat, coords.lon, coords.name)
            console.log(coords)
            this.lastMarker = {
              lat: coords.lat,
              lon: coords.lon,
              label: coords.name,
            }
            console.log(this.lastMarker)
          }
        })
    }
  }

  private esCoordenadas(value: string): boolean {
    const coordRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/
    return coordRegex.test(value)
  }
}


