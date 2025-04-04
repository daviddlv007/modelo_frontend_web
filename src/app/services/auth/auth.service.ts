// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userIdKey = 'user_id';
  private userNameKey = 'user_name';
  private userEmailKey = 'user_email';

  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, { correo, contrasena }).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        this.setUserId(response.id);
        this.setUserName(response.nombre);
        this.setUserEmail(response.correo);
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => {
        observer.next(null);
        observer.complete();
      });
    }

    return this.http.post(`${environment.apiUrl}/auth/logout`, null, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(() => {
        this.clearAuthData();
        this.router.navigate(['/login']);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null;
  }

  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.userEmailKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUserId(id: number): void {
    localStorage.setItem(this.userIdKey, id.toString());
  }

  private setUserName(nombre: string): void {
    localStorage.setItem(this.userNameKey, nombre);
  }

  private setUserEmail(correo: string): void {
    localStorage.setItem(this.userEmailKey, correo);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userEmailKey);
  }
}