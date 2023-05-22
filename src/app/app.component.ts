import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  showLoading = false;
  error = null;
  errorSub: Subscription;

  @ViewChild('putForm') putForm: NgForm;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.errorHandling.subscribe(
      error => {
        this.error = error;
      }
    )
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //console.log(postData);
    this.postService.createAndPost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.showLoading = true;
    this.postService.deletePosts().subscribe(
      (data) => {
        this.showLoading = false;
        this.loadedPosts = [];
      }
    )
  }

  private fetchPosts() {
    this.showLoading = true;  
    this.postService.fetchPosts()
    .subscribe(
      (posts) => {
        //console.log(posts);
        this.showLoading = false;
        this.loadedPosts = posts;
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    )
  }

  onItemClicked(data: Post) {
    //console.log()
    this.putForm.setValue({
      id: data.id,
      title: data.title,
      content: data.content
    });
  }

  onUpdatePost(data: Post){
    //console.log(data);
    this.showLoading = true;
    this.postService.updatePost(data).subscribe(
      response => {
        console.log(response);
        this.showLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.errorSub.unsubscribe();
  }
}
