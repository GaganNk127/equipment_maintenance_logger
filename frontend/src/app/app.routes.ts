import { Routes } from '@angular/router';
import { RegisterEquipmentComponent } from './pages/register-equipment/register-equipment.component';

export const routes: Routes = [
    { path: 'register', component: RegisterEquipmentComponent },
    { path: '', redirectTo: '/register', pathMatch: 'full' } // Default route for now
];
