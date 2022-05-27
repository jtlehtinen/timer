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
    }

    if (this.startTime === 0) return 0;

    const elapsed = Date.now() - this.startTime;
    return elapsed - this.pauseTime;
  }

  reset() {
    this.stopped = false;
    this.startTime = 0;
    this.pauseTime = 0;
    this.stopTime = 0;
  }

  start() {
    if (this.stopped) {
      this.pauseTime += (Date.now() - this.stopTime);
      this.stopped = false;
    } else {
      this.startTime = Date.now();
      this.pauseTime = 0;
      this.stopTime = 0;
      this.stopped = false;
    }
  }

  stop() {
    this.stopTime = Date.now();
    this.stopped = true;
  }

  running() {
    return this.startTime !== 0 && !this.stopped;
  }
};

export default Timer;
