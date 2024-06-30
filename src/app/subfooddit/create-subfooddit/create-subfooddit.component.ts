import { Component } from '@angular/core';
import { Subfooddit } from '../../../Models/Subfooddit.model';
import { SubfoodditService } from '../../../Services/subfooddit.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-subfooddit',
  templateUrl: './create-subfooddit.component.html',
  styleUrl: './create-subfooddit.component.scss',
})
export class CreateSubfoodditComponent {
  newSubfooddit: Subfooddit = new Subfooddit();

  constructor(
    private router: Router,
    private subfoodditService: SubfoodditService,
    private toastr: ToastrService
  ) {}

  public formSubmited() {
    let errorMessage: string | null = null;

    switch (true) {
      case !this.newSubfooddit.title:
        errorMessage = 'Please provide title!';
        break;
      case !this.newSubfooddit.description:
        errorMessage = 'Please provide description!';
        break;
      case /\s/.test(this.newSubfooddit.title):
        errorMessage = 'Title must not contain whitespace!';
        break;
    }

    if (errorMessage) {
      this.toastr.error(errorMessage, 'Subfooddit creation Error');
    } else {
      this.subfoodditService.postNewSubFoodit(this.newSubfooddit).subscribe(
        (newSubf: Subfooddit) => {
          this.router.navigate([`/f/${newSubf.title}`]);
          this.toastr.success(
            'Subfooddit created successfully!',
            'Subfooddit creation'
          );
        },
        error => {
          this.toastr.error(error.error, 'Subfooddit creation Error');
        }
      );
    }
  }
}
