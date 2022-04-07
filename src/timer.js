class Timer {
  constructor() {
    this.stopped = false;
    this.startTime = 0;
    this.pauseTime = 0;
    this.stopTime = 0;
  }

  millis() {
    if (this.stopped) {
      const elapsed = this.stopTime - this.startTime;
      return elapsed - this.pauseTime;
    } else {
      if (this.startTime === 0) return 0;

      const elapsed = Date.now() - this.startTime;
      return elapsed - this.pauseTime;
    }
  }

  reset() {
    console.log("reset()");
    this.stopped = false;
    this.startTime = 0;
    this.pauseTime = 0;
    this.stopTime = 0;
  }

  start() {
    console.log("start()");
    const now = Date.now();
    if (this.stopped) {
      this.pauseTime += (now - this.stopTime);
      this.stopped = false;
    } else {
      this.startTime = Date.now();
      this.pauseTime = 0;
      this.stopTime = 0;
      this.stopped = false;
    }
  }

  stop() {
    console.log("stop()");
    this.stopTime = Date.now();
    this.stopped = true;
  }

  running() {
    console.log("running");
    return this.startTime !== 0 && !this.stopped;
  }
};

export default Timer;
