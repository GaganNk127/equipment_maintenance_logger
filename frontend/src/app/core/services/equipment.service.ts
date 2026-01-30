import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Equipment } from '../models/equipment.model';
import { MaintenanceLog } from '../models/maintenance-log.model';
import { SummaryStats } from '../models/summary.model';

@Injectable({
    providedIn: 'root'
})
export class EquipmentService {
    private apiUrl = `${environment.apiUrl}/equipment`;
    private maintenanceUrl = `${environment.apiUrl}/maintenance`;
    private summaryUrl = `${environment.apiUrl}/summary`;

    constructor(private http: HttpClient) { }

    // Equipment
    getEquipment(): Observable<Equipment[]> {
        return this.http.get<Equipment[]>(this.apiUrl);
    }

    getEquipmentById(id: string): Observable<Equipment> {
        return this.http.get<Equipment>(`${this.apiUrl}/${id}`);
    }

    createEquipment(equipment: Equipment): Observable<Equipment> {
        return this.http.post<Equipment>(this.apiUrl, equipment);
    }

    // Maintenance
    getMaintenanceLogs(equipmentId: string): Observable<MaintenanceLog[]> {
        return this.http.get<MaintenanceLog[]>(`${this.maintenanceUrl}/${equipmentId}`);
    }

    createMaintenanceLog(log: { equipmentId: string, description: string, serviceDate: string }): Observable<MaintenanceLog> {
        return this.http.post<MaintenanceLog>(this.maintenanceUrl, log);
    }

    // Summary
    getSummary(): Observable<SummaryStats> {
        return this.http.get<SummaryStats>(this.summaryUrl);
    }
}
