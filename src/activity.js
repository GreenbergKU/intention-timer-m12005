class Activity {
    constructor(category, description, minutes, seconds) {
        this.id = Date.now();
        this.category = category;
        this.description = description;
        this.minutes = minutes;
        this.seconds = seconds;
        this.isCompleted = false;
        this.totalSeconds = this.minutes * 60 + this.seconds;

     }

     startTimer() {
       this.endTime = Date.now() + this.totalSeconds * 1000;
     }

     secondsLeft() {
       return Math.floor((this.endTime - Date.now()) / 1000);
     }

     markComplete() {
     this.isCompleted = true;
     }




     saveToStorage() {

     }
}
