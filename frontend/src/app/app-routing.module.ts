import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EarningComponent } from './pages/earning/earning.component';


const routes: Routes = [
    { path: '', redirectTo: '/earning', pathMatch: 'full' },
    { path: 'earning', component: EarningComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
