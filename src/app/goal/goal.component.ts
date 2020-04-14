import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
// import { AlternativeServiceOptions } from 'http2';
// import { Quote } from '@angular/compiler';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';

import { QuoteRequestService } from '../quote-http/quote-request.service';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  // goals: Goal[] = [
  //   new Goal(1,'My mission in life is not merely to survive, but to thrive; and to do so with some passion, some compassion, some humor, and some style.',' Maya Angelou',new Date(2000,6,9)),
  //   new Goal(2,'Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.','Buddha',new Date(1993,1,12)),
  //   new Goal(3,'What lies behind you and what lies in front of you, pales in comparison to what lies inside of you.',' Ralph Waldo Emerson',new Date(1919,11,18)),
  //   new Goal(4,'The future rewards those who press on. I do not have time to feel sorry for myself. I do not have time to complain. I am going to press on.','Barack Obama',new Date(2015,2,14)),
  //   new Goal(5,'There is nothing like returning to a place that remains unchanged to find the ways in which you yourself have altered.','Nelson Mandela',new Date(2010,3,14)),
  //   new Goal(6,'It always seems impossible until it is done.','Nelson Mandela',new Date(2010,3,14)),
   
  // ];


  goals:Goal[];

  alertService:AlertService;

  quote:Quote;


  toggleDetails(index){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  completeGoal(isComplete, index){
    if (isComplete) {
      this.goals.splice(index,1);
    }
  }

  deleteGoal(isComplete, index){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe("The goal has been deleted")
      }
    }
  }

  addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }


  constructor(goalService:GoalService, alertService:AlertService, private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }



  // constructor(goalService:GoalService, alertService:AlertService, private http:HttpClient) {
  //   this.goals = goalService.getGoals()
  //   this.alertService = alertService;
  // }



  // constructor(goalService:GoalService, alertService:AlertService) {
  //   this.goals = goalService.getGoals()
  //   this.alertService = alertService;
  // }

  
  // constructor() {
  //   this.goals
  // }

 
//   ngOnInit() {
//   }

// }

  // ngOnInit() {

  //   interface ApiResponse{
  //     author:string;
  //     quote:string;
  //   }


  //   this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
  //     // Succesful API request
  //     this.quote = new Quote(data.author, data.quote)
  //   },err=>{
  //       this.quote = new Quote("Winston Churchill","Never never give up!")
  //       console.log("An error occurred")
  //   })
    
  // }


  ngOnInit() {

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
  }


}





