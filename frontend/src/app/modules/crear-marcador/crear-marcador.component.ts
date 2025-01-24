import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CrearMarcadorService } from '../../services/crear-marcador.service';
import { BotonAtrasComponent } from '../boton-atras/boton-atras.component';
import { SubirImagenesComponent } from '../subir-imagenes/subir-imagenes.component';
import { MapasComponent } from '../mapas/mapas.component';

@Component({
  selector: 'app-crear-marcador',
  standalone: true,
  imports: [ReactiveFormsModule, BotonAtrasComponent, SubirImagenesComponent, MapasComponent],
  templateUrl: './crear-marcador.component.html',
})  
export class CrearMarcadorComponent {
  marcadorForm: FormGroup;
  imageUrl: string = '';
  mensaje: string = '';

  constructor(private fb: FormBuilder, private marcador: CrearMarcadorService, private router: Router) {
    this.marcadorForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      imagenUrl: [''],
      mapa: this.fb.group({
        ubicacion: this.fb.group({
          lat: [''],
          lon: ['']
        })
      })
    });
    
    // this.marcadorForm.get('mapa')?.enable();
  }

  crearMarcador() {
    if (this.marcadorForm.valid) {
      const marcadorData = this.marcadorForm.value;
      // Agrega la URL de la imagen al formulario antes de enviar
      marcadorData.imagenUrl = this.imageUrl;
      if (this.imageUrl == ""){
        this.mensaje = 'Debes subir una imagen';
        alert(this.mensaje);
      }
      else{
        this.marcador.crearMarcador(marcadorData).subscribe({
          next: (response) => {
            console.log('marcador creado correctamente:', response);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error al crear el marcador:', err);
          },
        });
      }
    } else {
      alert('Formulario no válido');
      console.log('Formulario no válido');
    }
  }
}