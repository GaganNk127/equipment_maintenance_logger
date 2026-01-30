import { Routes } from '@angular/router';
import { RegisterEquipmentComponent } from './pages/register-equipment/register-equipment.component';

import { EquipmentListComponent } from './pages/equipment-list/equipment-list.component';

export const routes: Routes = [
    { path: 'equipment', component: EquipmentListComponent },
    { path: 'register', component: RegisterEquipmentComponent },
    { path: '', redirectTo: '/equipment', pathMatch: 'full' }
];
