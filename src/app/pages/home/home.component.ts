import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs:any;
  filteredJobs:any;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobs = this.jobService.getJobs();
    this.filteredJobs = this.jobs;
  }
  
  filterJobs(event: Event) {
    const category = (event.target as HTMLInputElement).value;
    if (category === 'all') {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.jobService.getJobsByCategory(category);
    }
  }
}
