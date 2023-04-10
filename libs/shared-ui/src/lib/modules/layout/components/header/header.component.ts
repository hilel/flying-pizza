import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

import { ThemeType } from '@flying-pizza/model';
import { AuthService } from '@flying-pizza/shared-services';

@Component({
  selector: 'fp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  darkTheme: boolean = true;
  loggedIn: boolean = false;

  constructor(private router: Router, @Inject(LOCALE_ID) private locale: string, private auth: AuthService) {
    const theme = this._detectColorScheme();
    this.darkTheme = theme === 'dark';
    this.switchTheme(theme);
    this.router.navigate(['.', 'company']);

    this.auth.getAuthUser().subscribe((u) => {
      if (u) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }

  changeLocale() {
    const targetLocale = this.locale === 'en' ? 'he' : '';
    window.location.href = `${window.location.origin}/${targetLocale}`; // ${window.location.pathname}
  }

  switchTheme(forceTheme?: ThemeType) {
    this.darkTheme = forceTheme ? forceTheme === 'dark' : !this.darkTheme;
    const theme: ThemeType = this.darkTheme ? 'dark' : 'light'; 
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);    
  }

  logout() {
    this.auth
      .logout()
      .then(() => window.location.reload())
      .catch((e) => console.log(e.message));
  }

  // determines if the user has a set theme
  private _detectColorScheme(): ThemeType {
    // local storage is used to override OS theme settings
    const lsTheme = localStorage.getItem('theme');
    let theme: ThemeType = (lsTheme || 'dark') as ThemeType; // default to dark 
    if (!window.matchMedia) {
        // matchMedia method not supported
        theme = 'dark';
    } else if (theme === 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // OS theme setting detected as dark but user picked light
        theme = 'light';
    } else if (theme === 'dark' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // OS theme setting detected as light but user picked dark
      theme = 'dark';
    }

    return theme;
  }
}
