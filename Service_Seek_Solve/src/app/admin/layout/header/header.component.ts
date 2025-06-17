import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentLang = localStorage.getItem('lang') || 'en';

  constructor(private translate: TranslateService) {
    // Set default and use saved language
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

  switchLanguage() {
    // Toggle language
    this.currentLang = this.currentLang === 'en' ? 'ur' : 'en';
    
    // Save in localStorage
    localStorage.setItem('lang', this.currentLang);
    
    // Use the new language
    this.translate.use(this.currentLang);

    // Optional: Reload to reapply app-wide instantly
    
  }
}
