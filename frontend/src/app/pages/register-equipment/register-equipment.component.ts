import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentService } from '../../core/services/equipment.service';

@Component({
    selector: 'app-register-equipment',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register-equipment.component.html',
    styleUrls: ['./register-equipment.component.css']
})
export class RegisterEquipmentComponent {
    equipmentForm: FormGroup;
    isLoading = false;
    successMessage = '';
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private equipmentService: EquipmentService,
        private router: Router
    ) {
        this.equipmentForm = this.fb.group({
            name: ['', Validators.required],
            serialNumber: ['', Validators.required],
            lastServiceDate: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.equipmentForm.valid) {
            this.isLoading = true;
            this.successMessage = '';
            this.errorMessage = '';

            this.equipmentService.createEquipment(this.equipmentForm.value).subscribe({
                next: () => {
                    this.successMessage = 'Equipment registered successfully!';
                    this.isLoading = false;
                    this.equipmentForm.reset();
                
                },
                error: (error) => {
                    this.errorMessage = error.error?.message || 'Failed to register equipment.';
                    this.isLoading = false;
                }
            });
        } else {
            this.equipmentForm.markAllAsTouched();
        }
    }
}
