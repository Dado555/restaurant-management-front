import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTableLayoutComponent } from './pages/admin/admin-table-layout/admin-table-layout.component';
import { AdminAnalyticsComponent } from './pages/admin/admin-analytics/admin-analytics.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminMenuItemsComponent } from './pages/admin/admin-menu-items/admin-menu-items.component';
import { AdminOrderViewComponent } from './pages/admin/admin-order-view/admin-order-view.component';
import { AdminOrdersListComponent } from './pages/admin/admin-orders-list/admin-orders-list.component';
import { AdminWorkersComponent } from './pages/admin/admin-workers/admin-workers.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { AddItemsComponent } from './pages/waiter/add-items/add-items.component';
import { TablePageComponent } from './pages/waiter/table-page/table-page.component';
import { WaiterHomeComponent } from './pages/waiter/waiter-home/waiter-home.component';
import { WorkerHomeComponent } from './pages/worker/worker-home/worker-home.component';
import { AdminAuthGuard } from './auth-guard/adminAuthGuard/admin-auth-guard';
import { WaiterAuthGuard } from './auth-guard/waiterAuthGuard/waiter-auth-guard';
import { CookAuthGuard } from './auth-guard/cookAuthGuard/cook-auth-guard';
import { BartenderAuthGuard } from './auth-guard/bartenderAuthGuard/bartender-auth-guard';
import { WorkerAuthGuard } from './auth-guard/workerAuthGuard/worker-auth-guard';
import { HomeActivate } from './auth-guard/homeActivate/home-activate';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [HomeActivate] },
  { path: 'login', component: LoginComponent },

  {
    path: 'waiter',
    canActivate: [WaiterAuthGuard],
    children: [
      { path: '', component: WaiterHomeComponent },
      { path: 'home', component: WaiterHomeComponent },
      { path: 'table/:id', component: TablePageComponent },
      { path: 'table/:id/add', component: AddItemsComponent },
    ],
  },

  {
    path: 'worker',
    canActivate: [WorkerAuthGuard],
    children: [
      { path: '', component: WorkerHomeComponent },
      { path: 'home', component: WorkerHomeComponent },
    ],
  },

  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'home', component: AdminHomeComponent },
      { path: 'analytics', component: AdminAnalyticsComponent },
      { path: 'workers', component: AdminWorkersComponent },
      { path: 'orders', component: AdminOrdersListComponent },
      { path: 'order', component: AdminOrderViewComponent },
      { path: 'menu-items', component: AdminMenuItemsComponent },
      { path: 'table-layout', component: AdminTableLayoutComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only)],
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
