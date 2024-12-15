import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatLineModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {ExchangeComponent} from './ui-components/exchange/exchange.component';
import {SwitchButtonComponent} from './ui-components/switch-button/switch-button.component';
import {SelectCurrencyComponent} from './ui-components/select-currency/select-currency.component';
import {MatInputModule} from '@angular/material/input';
import {UsdTransformPipe} from './pipes/usd-transform.pipe';
import {CurrencyService} from './services/currency.service';
import {CryptoService} from './services/crypto.service';
import {CoinGeckoInterceptorService} from './services/coin-gecko.interceptor.service';
import {SendReceiveComponent} from './ui-components/send-receive/send-receive.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ExchangeService} from './services/exchange.service';
import {ListItemUiComponent} from './ui-components/list-item/list-item-ui/list-item-ui.component';
import {ListItemBusinessComponent} from './ui-components/list-item/list-item-business/list-item-business.component';
import {ActiveItemDirective} from './directives/active-item.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ExchangeComponent,
    SwitchButtonComponent,
    SelectCurrencyComponent,
    UsdTransformPipe,
    SendReceiveComponent,
    ListItemUiComponent,
    ListItemBusinessComponent,
    ActiveItemDirective,
  ],
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
    MatInputModule,
    MatPaginatorModule,
  ],
  providers: [
    CurrencyService,
    CryptoService,
    ExchangeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoinGeckoInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
