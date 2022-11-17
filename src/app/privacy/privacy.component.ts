// import { Component, OnInit } from '@angular/core';
// import { RepositoryService } from './../shared/services/repository.service';

// @Component({
//   selector: 'app-privacy',
//   templateUrl: './privacy.component.html',
//   styleUrls: ['./privacy.component.scss']
// })
// export class PrivacyComponent implements OnInit {

//   public claims: [] = [];

//   constructor(private repository: RepositoryService) { }

//   ngOnInit(): void {
//     this.getClaims();
//   }

//   public getClaims() {
//     this.repository.getData('api/privacy')
//     .subscribe(res => {
//       this.claims = res as [];
//     });
//   }
// }
