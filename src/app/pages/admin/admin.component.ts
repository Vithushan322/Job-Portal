import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  jobForm: FormGroup;
  jobs:any;

  constructor(private fb: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.jobs = this.jobService.getJobs();
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.jobService.addJob(this.jobForm.value);
      this.jobForm.reset();
    }
  }

  editJob(job: any) {
    this.jobForm.patchValue(job);
  }

  deleteJob(id: any) {
    this.jobService.deleteJob(id);
  }
}
