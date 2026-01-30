import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EquipmentService } from '../../core/services/equipment.service';
import { Equipment } from '../../core/models/equipment.model';
import { MaintenanceModalComponent } from '../../shared/components/maintenance-modal/maintenance-modal.component';

@Component({
    selector: 'app-equipment-list',
    standalone: true,
    imports: [CommonModule, RouterModule, MaintenanceModalComponent],
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
    equipmentList: Equipment[] = [];
    isLoading = true;
    errorMessage = '';

    // Modal State
    isModalOpen = false;
    selectedEquipmentId: string | null = null;

    constructor(private equipmentService: EquipmentService) { }

    ngOnInit(): void {
        this.loadEquipment();
    }

    loadEquipment() {
        this.isLoading = true;
        this.equipmentService.getEquipment().subscribe({
            next: (data) => {
                this.equipmentList = data;
                this.isLoading = false;
            },
            error: (error) => {
                this.errorMessage = 'Failed to load equipment list.';
                this.isLoading = false;
                console.error(error);
            }
        });
    }

    getStatusClass(status: string | undefined): string {
        if (!status) return 'badge-secondary';
        switch (status) {
            case 'OK': return 'badge-success';
            case 'Due Soon': return 'badge-warning';
            case 'Due for Service': return 'badge-danger';
            default: return 'badge-secondary';
        }
    }

    openMaintenanceModal(equipmentId: string) {
        this.selectedEquipmentId = equipmentId;
        this.isModalOpen = true;
    }

    closeMaintenanceModal() {
        this.isModalOpen = false;
        this.selectedEquipmentId = null;
    }

    onMaintenanceSaved() {
        this.loadEquipment(); // Refresh list to update status/dates
    }
}
