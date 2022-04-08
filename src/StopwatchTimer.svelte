<script>
  import { onDestroy } from 'svelte';
  import Timer from './timer.js';

  const DOUBLE_TAP_INTERVAL_MILLIS = 250;
  const LEFT_MOUSE_BUTTON = 0;
  const MILLIS_IN_SECOND = 1000;
  const MILLIS_IN_MINUTE = 60 * 1000;
  const MILLIS_IN_HOUR = 60 * 60 * 1000;

  let time = {
    milliseconds: "000",
    seconds: "00",
    minutes: "00",
    hours: "00",
  };

  const timer = new Timer();
  let elapsed = 0; // For setting 'dim' class.

  function updateTime() {
    elapsed = timer.millis();

    const milliseconds = elapsed % 1000;
    const seconds = Math.floor(elapsed / MILLIS_IN_SECOND) % 60;
    const minutes = Math.floor(elapsed / MILLIS_IN_MINUTE) % 60;
    const hours = Math.floor(elapsed / MILLIS_IN_HOUR);

    time.milliseconds = milliseconds.toString().padStart(3, '0');
    time.seconds = seconds.toString().padStart(2, '0');
    time.minutes = minutes.toString().padStart(2, '0');
    time.hours = hours.toString().padStart(2, '0');
  }

  let lastLeftTimestamp = 0;

  function handlePointerDownLeftSide(event) {
    const doubleTap = (event.timeStamp - lastLeftTimestamp) <= DOUBLE_TAP_INTERVAL_MILLIS;
    if (doubleTap) {
      timer.reset();
    }
    lastLeftTimestamp = event.timeStamp;
  }

  function handlePointerDownRightSide(event) {
    if (timer.running()) {
      timer.stop();
    } else {
      timer.start();
    }
  }

  function handlePointerDown(event) {
    const type = event.pointerType;
    if (type === "mouse" && event.button !== LEFT_MOUSE_BUTTON) return;

    const leftSide = event.pageX < (window.innerWidth / 2);
    if (leftSide) {
      handlePointerDownLeftSide(event);
    } else {
      handlePointerDownRightSide(event);
    }
  }

  const interval = setInterval(() => updateTime(), 10);
  onDestroy(() => clearInterval(interval));
</script>

<svelte:window on:pointerdown={handlePointerDown}/>

<div>
  <p>
    <!-- @NOTE: The weird comments below is for not introducing whitespace... Yeah I know, dum right? -->
    <span id="hours" class="big" class:dim={elapsed<MILLIS_IN_HOUR}>{time.hours}:</span><!--
 --><span id="minutes" class="big" class:dim={elapsed<MILLIS_IN_MINUTE}>{time.minutes}:</span><!--
 --><span id="seconds" class="big" class:dim={elapsed<MILLIS_IN_SECOND}>{time.seconds}</span><!--
 --><span id="milliseconds" class="small" class:dim={elapsed===0}>{time.milliseconds}</span>
  </p>
</div>

<style>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-align: center;
}

p {
  user-select: none;
  color: red;
}

.big {
  font-size: 18vw;
}

.small {
  font-size: 9vw;
}

.dim {
  color: #400000;
}
</style>
