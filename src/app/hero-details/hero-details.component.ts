import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../services/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit {
  @Input() hero?: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  save(): void {
    this.heroService.updateHero(this.hero!).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
