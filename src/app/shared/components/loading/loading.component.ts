import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  loading = false;
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loadingChanged.subscribe(
      (status) => (this.loading = status)
    );
  }

  ngOnDestroy(): void {
    this.loadingService.loadingChanged.unsubscribe();
  }
}
