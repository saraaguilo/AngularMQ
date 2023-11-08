import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '';
  
  themeSelection: boolean = false
  constructor(@Inject(DOCUMENT) private document: Document){
    
    let theme=window.localStorage.getItem("theme")
    if (theme){
      this.themeSelection=theme=='dark' ? true:false
      this.changeTheme(this.themeSelection)
    }
  }
  changeTheme(state: any) {
    let theme = state ? 'dark' : 'light';
    window.localStorage.setItem("theme", theme);
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    themeLink.href = 'lara-' + theme + '-blue' + '.css';
  }
}
