import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  activeRightBlock;
  constructor(public authService: AuthService) {
    this.activeRightBlock = this.authService.isUserVerified;
  }

  ngOnInit(): void {}

  signOut() {
    this.authService.SignOut();
  }

  async terminateHandler() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this User Account!',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        this.authService.removeUser();
        swal('Poof! Your User Account has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your User Account is still available!');
      }
    });
  }
}
