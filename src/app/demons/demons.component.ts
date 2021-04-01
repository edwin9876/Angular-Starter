import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Demon } from '../demon';
import { DemonsService } from '../demons.service';

// const fs = require('fs');

@Component({
  selector: 'app-demons',
  templateUrl: './demons.component.html',
  styleUrls: ['./demons.component.scss'],
})
export class DemonsComponent implements OnInit {
  demons: Demon[] = [];
  constructor(private demonsService: DemonsService) {}

  getDemons(): void {
    this.demonsService.getDemons().subscribe((d) => (this.demons = d));
  }

  addDemon(name: string): void {
    if (!name) return;
    this.demonsService
      .addDemon({ name } as Demon)
      .subscribe((d) => this.demons.push(d));
  }
  delete(demon: Demon): void {
    this.demons = this.demons.filter((d) => d !== demon);
    this.demonsService.deleteDemon(demon.id).subscribe();
  }
  ngOnInit(): void {
    this.getDemons();
  }
}
