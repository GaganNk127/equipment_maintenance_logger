import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts$ | async" 
           class="toast" 
           [ngClass]="toast.type"
           (click)="remove(toast.id)">
        {{ toast.message }}
      </div>
    </div>
  `,
    styles: [`
    .toast-container {
      position: fixed;
      top: 80px; /* Below navbar */
      right: 20px;
      z-index: 1100;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .toast {
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      cursor: pointer;
      animation: slideIn 0.3s ease-out;
      min-width: 250px;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .toast.success { background-color: var(--success-color); }
    .toast.error { background-color: var(--danger-color); }
    .toast.info { background-color: var(--secondary-light); }
  `]
})
export class ToastComponent {
    toasts$;

    constructor(private toastService: ToastService) {
        this.toasts$ = this.toastService.toasts$;
    }

    remove(id: number) {
        this.toastService.remove(id);
    }
}
