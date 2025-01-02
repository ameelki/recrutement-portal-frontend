import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordResetRequest } from './auth.service';
export interface Address {
  country: string;
  city: string;
  street: string;
  postalCode: string;
}
export interface UserSummary {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // Added phone number
  cardidnumber: string; // Added ID card number
}


  export interface JwtPayload {
    sub?: string; 
    email?: string; 
    exp?: number;
    realm_access?: {
      roles?: string[];
    };
  
  }
  
  // Add other properties as needed


export interface User {
  id?: number; // Optional field
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string | null; // Le password peut être une chaîne ou null
  phone?: string;
  userStatus?: number;
  cardidnumber: string;
  address: Address;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://141.145.217.37:8082/api/user'; // Replace with your backend URL
  private api = 'http://localhost:8091/api/candidate'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<void> {
    return this.http.post<void>(this.api, user);
  }

  resetPassword(passwordResetRequest: PasswordResetRequest): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Cookie': 'JSESSIONID=YOUR_SESSION_ID' // Add if needed
    });

    return this.http.patch<void>(this.apiUrl, passwordResetRequest, { headers });
  }

  private apiUrl1= 'http://localhost:8083/manage/usersList'; // Update with your API endpoint


  getUserList(token: string): Observable<UserSummary[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserSummary[]>(this.apiUrl1, { headers });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.post<User>(`http://localhost:8083/api/user/by-email`, { email });
  }
  

  updateUserById(userId: number, tokenSubId: string, user: User): Observable<void> {
    return this.http.put<void>(`http://localhost:8083/api/user/${userId}/${tokenSubId}`, user);
  }
}