import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMobileMenuVisible: boolean = false;
   currentLang = 'en';
  constructor(private translate: TranslateService) { 
    this.translate.setDefaultLang(this.currentLang);
  }

  ngOnInit(): void {
    
  }
switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ur' : 'en';
    this.translate.use(this.currentLang);
  }
 
  toggleMobileMenu(): void {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
  
}
