import { Component, effect } from "@angular/core"
import { Router } from "@angular/router"
import { AuthGoogleService } from "../../services/auth-google.service"
import { User } from "../../models/user.model"
import { UserService } from "../../services/user.service"

@Component({
  standalone: true,
  imports: [],
  templateUrl: "./bridge.component.html",
})
export class BridgeComponent {
  profile: any
  constructor(
    private authService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
  ) {
    this.profile = this.authService.profile
    effect(() => {
      if (this.profile != null) {
        console.log("Profile: ", this.profile())
        console.log("auth: ", this.authService.getRawProfile())
        const {given_name, email, sub } = this.profile()
        const user: User = {
          id: sub,
          name: given_name,
          email: email,
          oauth: {
            access_token: this.authService.getToken(),
            expires_in: this.authService.getExpiresIn(),
            refresh_token: this.authService.getRefreshToken(),
            expires_in_refresh: this.authService.getExpiresInRefresh(),
          },
        }
        this.userService.saveUserToDb(user).subscribe({
          next: (response) => {
            const {
              googleId,
              name,
              email,
              access_token,
              expires_in,
            } = response.detail

            const user: User = {
              id: googleId,
              name: name,
              email: email,
              oauth: {
                access_token: access_token,
                expires_in: expires_in,
              },
            }
            this.userService.setUser(user)
            this.router.navigate(["/dashboard"])
          },
          error: (err) => {
            console.error(
              "Error al guardar el usuario en la base de datos:",
              err,
            )
            this.userService.setUser(user)
            this.router.navigate(["/"])
          },
        })
      }
    })
  }
}
