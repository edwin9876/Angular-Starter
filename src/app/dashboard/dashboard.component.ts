import { Component, OnInit } from '@angular/core';
import { Demon } from '../services/demon';
import { DemonsService } from '../services/demons.service';
import { Hero } from '../services/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  demons: Demon[] = [];

  constructor(
    private heroService: HeroService,
    private demonsService: DemonsService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.getDemons();
  }
  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
  getDemons(): void {
    this.demonsService
      .getDemons()
      .subscribe((demons) => (this.demons = demons.slice(1, 5)));
  }
}
