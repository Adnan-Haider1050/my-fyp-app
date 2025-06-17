import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private apiUrl = 'http://localhost:5000/api/requests';

  constructor(private http: HttpClient) {}

  // 🔽 POST: Create new request
  createRequest(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // 🔽 GET: Fetch all requests
  getAllRequests() {
    return this.http.get(this.apiUrl);
  }

  // 🔽 PUT: Update request
  updateRequest(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // 🔽 DELETE: Delete request
  deleteRequest(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  completeRequest(id: string) {
  return this.http.patch(`${this.apiUrl}/${id}/complete`, {});
}


}
