import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CodeInputModule } from 'angular-code-input';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { SimpleModalModule } from 'ngx-simple-modal';
import {
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { NgChartsModule } from 'ng2-charts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { AfterIfDirective } from './directives/after-if-directive.directive';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { BaseComponent } from './components/login/base/base.component';
import { ManagerLoginComponent } from './components/login/manager-login/manager-login.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { WorkerLoginComponent } from './components/login/worker-login/worker-login.component';
import { WaiterHomeComponent } from './pages/waiter/waiter-home/waiter-home.component';
import { TablePageComponent } from './pages/waiter/table-page/table-page.component';
import { AddItemsComponent } from './pages/waiter/add-items/add-items.component';
import { DragDropComponent } from './components/drag-drop/drag-drop/drag-drop.component';
import { WorkerHomeComponent } from './pages/worker/worker-home/worker-home.component';
import { LoginNotificationComponent } from './components/notifications/login-notification/login-notification/login-notification.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { LineChartComponentComponent } from './components/admin/admin-dashboard/charts/line-chart-component/line-chart-component.component';
import { DoughnutChartComponent } from './components/admin/admin-dashboard/charts/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './components/admin/admin-dashboard/charts/bar-chart/bar-chart.component';
import { AdminAnalyticsComponent } from './pages/admin/admin-analytics/admin-analytics.component';
import { AdminAnalyticsComponentComponent } from './components/admin/admin-analytics-component/admin-analytics-component.component';
import { ScatterChartComponent } from './components/admin/admin-dashboard/charts/scatter-chart/scatter-chart.component';
import { AdminWorkersComponent } from './pages/admin/admin-workers/admin-workers.component';
import { AdminWorkersListComponent } from './components/admin/admin-workers-list/admin-workers-list.component';
import { AddWorkerFormComponent } from './components/modals/add-worker-form/add-worker-form.component';
import { AdminOrdersListComponent } from './pages/admin/admin-orders-list/admin-orders-list.component';
import { OrdersListComponent } from './components/admin/orders-list/orders-list.component';
import { OrderViewComponent } from './components/admin/order-view/order-view.component';
import { AdminOrderViewComponent } from './pages/admin/admin-order-view/admin-order-view.component';
import { AdminMenuItemsComponent } from './pages/admin/admin-menu-items/admin-menu-items.component';
import { MenuItemsViewComponent } from './components/admin/menu-items-view/menu-items-view.component';
import { AddMenuItemFormComponent } from './components/modals/add-menu-item-form/add-menu-item-form.component';
import { NavheaderComponent } from './components/navheader/navheader.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RevenueChartComponent } from './components/admin/admin-dashboard/charts/revenue-chart/revenue-chart.component';
import { OrdersCountChartComponent } from './components/admin/admin-dashboard/charts/orders-count-chart/orders-count-chart.component';
import { AdminTableLayoutComponent } from './pages/admin/admin-table-layout/admin-table-layout.component';
import { AdminTableEditComponent } from './components/admin/admin-table-edit/admin-table-edit/admin-table-edit.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { AddSectorFormComponent } from './components/modals/add-sector-form/add-sector-form/add-sector-form.component';
import { DeleteSectionFormComponent } from './components/modals/delete-section-form/delete-section-form/delete-section-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminAuthGuard } from './auth-guard/adminAuthGuard/admin-auth-guard';
import { WaiterAuthGuard } from './auth-guard/waiterAuthGuard/waiter-auth-guard';
import { CookAuthGuard } from './auth-guard/cookAuthGuard/cook-auth-guard';
import { BartenderAuthGuard } from './auth-guard/bartenderAuthGuard/bartender-auth-guard';
import { WorkerAuthGuard } from './auth-guard/workerAuthGuard/worker-auth-guard';
import { HomeActivate } from './auth-guard/homeActivate/home-activate';
import { OrderStatusDisplayPipe } from './pipes/order-status-display/order-status-display.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    ManagerLoginComponent,
    LoginComponent,
    NotFoundComponent,
    WorkerLoginComponent,
    WaiterHomeComponent,
    TablePageComponent,
    AddItemsComponent,
    DragDropComponent,
    WorkerHomeComponent,
    AfterIfDirective,
    LoginNotificationComponent,
    AdminSidebarComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    LineChartComponentComponent,
    DoughnutChartComponent,
    BarChartComponent,
    AdminAnalyticsComponent,
    AdminAnalyticsComponentComponent,
    ScatterChartComponent,
    AdminWorkersComponent,
    AdminWorkersListComponent,
    AddWorkerFormComponent,
    AdminOrdersListComponent,
    OrdersListComponent,
    OrderViewComponent,
    AdminOrderViewComponent,
    AdminMenuItemsComponent,
    MenuItemsViewComponent,
    AddMenuItemFormComponent,
    AdminTableLayoutComponent,
    AdminTableEditComponent,
    NavheaderComponent,
    RevenueChartComponent,
    OrdersCountChartComponent,
    AddSectorFormComponent,
    DeleteSectionFormComponent,
    OrderStatusDisplayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    CodeInputModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatExpansionModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    HttpClientModule,
    PerfectScrollbarModule,
    NgChartsModule,
    SimpleModalModule,
    MatIconModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    MatPaginatorModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    AdminAuthGuard,
    WaiterAuthGuard,
    CookAuthGuard,
    BartenderAuthGuard,
    WorkerAuthGuard,
    HomeActivate,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
