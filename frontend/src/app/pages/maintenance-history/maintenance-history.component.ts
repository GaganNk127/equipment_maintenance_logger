import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EquipmentService } from '../../core/services/equipment.service';
import { Equipment } from '../../core/models/equipment.model';
import { MaintenanceLog } from '../../core/models/maintenance-log.model';

@Component({
    selector: 'app-maintenance-history',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './maintenance-history.component.html',
    styleUrls: ['./maintenance-history.component.css']
})
export class MaintenanceHistoryComponent implements OnInit {
    equipment: Equipment | null = null;
    logs: MaintenanceLog[] = [];
    isLoading = true;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private equipmentService: EquipmentService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadData(id);
        } else {
            this.errorMessage = 'No equipment ID provided.';
            this.isLoading = false;
        }
    }

    loadData(id: string) {
        this.isLoading = true;

        // ForkJoin could be used, but sequential for simplicity ensuring equipment exists first
        this.equipmentService.getEquipmentById(id).subscribe({
            next: (eq) => {
                this.equipment = eq;
                this.loadLogs(id);
            },
            error: (err) => {
                this.errorMessage = 'Failed to load equipment details.';
                this.isLoading = false;
            }
        });
    }

    loadLogs(id: string) {
        this.equipmentService.getMaintenanceLogs(id).subscribe({
            next: (data) => {
                this.logs = data;
                this.isLoading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load maintenance history.';
                this.isLoading = false;
            }
        });
    }
}
