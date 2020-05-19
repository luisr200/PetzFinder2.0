import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Tag } from '../models/tag';
import { TagService } from 'app/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, private tagService: TagService) { }

  tag: Tag;
  ngOnInit(): void {
    this.getTag();
  }

  getTag(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tagService.getTag(id)
    .subscribe(tag => { this.tag = tag; console.log(this.tag) });
  }

  goBack(): void {
    this.location.back();
  }

  getUrl(): string{
    return `url(${this.tag.Avatar})`;
  }

}
