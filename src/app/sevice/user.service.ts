import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenAuthorization, PasswordResetRequest } from './auth.service';
import { UserlistResponse } from '../models/userlist-response';
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

  private apiUrl = '/api/user'; // Replace with your backend URL
  private api = '/api/candidate'; // Replace with your backend URL

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

  private apiUrl1= '/manage/usersList'; // Update with your API endpoint


  getUserList(token: string): Observable<UserSummary[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserSummary[]>(this.apiUrl1, { headers });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.post<User>(`/api/user/by-email`, { email });
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(`/api/userdetails`);
  }

  updateUserDetails(user:User): Observable<User> {
    const payload={
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      userStatus:1
    }
    return this.http.put<User>(`/api/userdetails/${user.id}`,payload);
  }


  refreshToken(refreshToken:string): Observable<AccessTokenAuthorization> {
const payload={
  refreshToken:refreshToken
}
    return this.http.post<AccessTokenAuthorization>(`/user`,payload);
  }

  updateUserById(userId: number, tokenSubId: string, user: User): Observable<void> {

    return this.http.put<void>(`http://localhost:8083/api/user/${userId}/${tokenSubId}`, user);
  }

  getUsers(page: number = 0, size: number = 5): Observable<UserlistResponse> {
    return this.http.get<UserlistResponse>(`/api/users?page=${page}&size=${size}`);
  }

}
