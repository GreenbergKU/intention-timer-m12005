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
    if (this.seconds < 10 && this.minutes < 10) {
      return `0${this.minutes}:0${this.seconds}`;
    } else if (this.seconds < 10 && this.minutes >= 10) {
      return `${this.minutes}:0${this.seconds}`;
    } else if (this.seconds >= 10 && this.minutes < 10) {
      return `0${this.minutes}:${this.seconds}`;
    };
    return `${this.minutes}:${this.seconds}`;
  }

/////// ADDITIONS
  markComplete() {

    this.isCompleted = true;

  }
}  

