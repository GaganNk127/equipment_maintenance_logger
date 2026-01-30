import { Routes } from '@angular/router';
import { RegisterEquipmentComponent } from './pages/register-equipment/register-equipment.component';

import { EquipmentListComponent } from './pages/equipment-list/equipment-list.component';
import { MaintenanceHistoryComponent } from './pages/maintenance-history/maintenance-history.component';

export const routes: Routes = [
    { path: 'equipment', component: EquipmentListComponent },
    { path: 'maintenance/:id', component: MaintenanceHistoryComponent },
    { path: 'register', component: RegisterEquipmentComponent },
    { path: '', redirectTo: '/equipment', pathMatch: 'full' }
];
