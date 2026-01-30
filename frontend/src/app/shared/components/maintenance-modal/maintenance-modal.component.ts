import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from '../../../core/services/equipment.service';
import { Equipment } from '../../../core/models/equipment.model';

@Component({
    selector: 'app-maintenance-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './maintenance-modal.component.html',
    styleUrls: ['./maintenance-modal.component.css']
})
export class MaintenanceModalComponent implements OnChanges, OnInit {
    @Input() equipmentId: string | null = null;
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<void>();

    maintenanceForm: FormGroup;
    equipmentList: Equipment[] = [];
    isLoading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private equipmentService: EquipmentService
    ) {
        this.maintenanceForm = this.fb.group({
            equipmentId: ['', Validators.required],
            description: ['', Validators.required],
            serviceDate: [new Date().toISOString().split('T')[0], Validators.required]
        });
    }

    ngOnInit() {
        this.loadEquipmentList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
            if (this.equipmentId) {
                this.maintenanceForm.patchValue({
                    equipmentId: this.equipmentId,
                    description: '',
                    serviceDate: new Date().toISOString().split('T')[0]
                });
            } else {
                this.maintenanceForm.reset({
                    equipmentId: '',
                    description: '',
                    serviceDate: new Date().toISOString().split('T')[0]
                });
            }
            this.errorMessage = '';
        }
    }

    loadEquipmentList() {
        this.equipmentService.getEquipment().subscribe({
            next: (data) => this.equipmentList = data,
            error: (err) => console.error('Failed to load equipment for dropdown', err)
        });
    }

    onClose() {
        this.close.emit();
    }

    onSubmit() {
        if (this.maintenanceForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            this.equipmentService.createMaintenanceLog(this.maintenanceForm.value).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.save.emit();
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
