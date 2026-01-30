import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from '../../../core/services/equipment.service';

@Component({
    selector: 'app-maintenance-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './maintenance-modal.component.html',
    styleUrls: ['./maintenance-modal.component.css']
})
export class MaintenanceModalComponent implements OnChanges {
    @Input() equipmentId: string | null = null;
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<void>();

    maintenanceForm: FormGroup;
    isLoading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private equipmentService: EquipmentService
    ) {
        this.maintenanceForm = this.fb.group({
            description: ['', Validators.required],
            serviceDate: [new Date().toISOString().split('T')[0], Validators.required] // Default to today
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
            // Reset form when opened
            this.maintenanceForm.reset({
                description: '',
                serviceDate: new Date().toISOString().split('T')[0]
            });
            this.errorMessage = '';
        }
    }

    onClose() {
        this.close.emit();
    }

    onSubmit() {
        if (this.maintenanceForm.valid && this.equipmentId) {
            this.isLoading = true;
            this.errorMessage = '';

            const logData = {
                equipmentId: this.equipmentId,
                ...this.maintenanceForm.value
            };

            this.equipmentService.createMaintenanceLog(logData).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.save.emit(); // Notify parent to refresh list
                    this.onClose();
                },
                error: (err) => {
                    this.isLoading = false;
                    this.errorMessage = err.error?.message || 'Failed to save maintenance log.';
                }
            });
        } else {
            this.maintenanceForm.markAllAsTouched();
        }
    }
}
