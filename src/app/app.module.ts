import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatLineModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ExchangeComponent } from './ui-components/exchange/exchange.component';
import { SendComponent } from './ui-components/send/send.component';
import { ReceiveComponent } from './ui-components/receive/receive.component';
import { SwitchButtonComponent } from './ui-components/switch-button/switch-button.component';
import { SelectCurrencyComponent } from './ui-components/select-currency/select-currency.component';
import { ListItemComponent } from './ui-components/list-item/list-item.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, ExchangeComponent, SendComponent, ReceiveComponent, SwitchButtonComponent, SelectCurrencyComponent, ListItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    MatLineModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
