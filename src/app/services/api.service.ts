import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Generic methods
    getAll(endpoint: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/${endpoint}/`);
    }

    getOne(endpoint: string, id: any): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${endpoint}/${id}/`);
    }

    create(endpoint: string, data: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${endpoint}/`, data);
    }

    update(endpoint: string, id: any, data: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${endpoint}/${id}/`, data);
    }

    patch(endpoint: string, id: any, data: any): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/${endpoint}/${id}/`, data);
    }

    delete(endpoint: string, id: any): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}/`);
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/auth/login/`, { username, password });
    }

    spinWheel(): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/wheel/spin/`, {});
    }
}
