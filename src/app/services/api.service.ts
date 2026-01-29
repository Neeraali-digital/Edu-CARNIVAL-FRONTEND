import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://127.0.0.1:8000/api';

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

    delete(endpoint: string, id: any): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}/`);
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/auth/login/`, { username, password });
    }
}
