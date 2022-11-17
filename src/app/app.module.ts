import { ErrorHandlerService } from './shared/services/error-handler.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routes/app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { OrdersComponent } from './orders/orders.component';
// import { PrivacyComponent } from './privacy/privacy.component';
import { AddOrderDialogComponent } from './orders/add-order-dialog/add-order-dialog.component';
// import { ToolsComponent } from './tools/tools.component';
// import { AddToolDialogComponent } from './tools/add-tool-dialog/add-tool-dialog.component';
import { ToolService } from './shared/services/tool.service';
// import { AddToolDialogComponent } from './tools/add-tool-dialog/add-tool-dialog.component';
import { AccountActivationDialogComponent } from './authentication/account-activation/account-activation-dialog/account-activation-dialog.component';
// import { AddToolComponent } from './tools/add-tool/add-tool.component';
// import { EditToolComponent } from './tools/edit-tool/edit-tool.component';
// import { DeleteToolComponent } from './tools/delete-tool/delete-tool.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    // OrdersComponent,
    // PrivacyComponent,
    // AddOrderDialogComponent,
    // ToolsComponent,
    // AddToolDialogComponent,
    AccountActivationDialogComponent,
    // AddToolComponent,
    // EditToolComponent,
    // DeleteToolComponent
    // AddToolDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
