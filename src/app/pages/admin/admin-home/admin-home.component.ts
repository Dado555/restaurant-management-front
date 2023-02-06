import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss', //'../../../../vendor/chartist/css/chartist.min.css',
  //'../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css', '../../../../styles/template/css/style.css', 
  //'../../../../vendor/jqvmap/css/jqvmap.min.css'
  ]
})
export class AdminHomeComponent implements OnInit {
  opened: boolean = false;
  componentName: string = "Dashboard";

  constructor(private router : Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user-data') as string);
    if (!user?.authorities.includes('MANAGER') && !user?.authorities.includes('ADMIN')) {
      this.router.navigate(['/login']);
    }
  }

}
