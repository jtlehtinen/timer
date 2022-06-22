<script>
  import { onMount, onDestroy } from 'svelte';
  import Timer from './timer.js';

  const DOUBLE_TAP_INTERVAL_MILLIS = 250;
  const LEFT_MOUSE_BUTTON = 0;
  const MILLIS_IN_SECOND = 1000;
  const MILLIS_IN_MINUTE = 60 * 1000;
  const MILLIS_IN_HOUR = 60 * 60 * 1000;

  let time = {
    elapsedMillis: 0,
    milliseconds: '000',
    seconds: '00',
    minutes: '00',
    hours: '00',
  };

  const timer = new Timer();

  function newTime(elapsedMillis) {
    const milliseconds = elapsedMillis % 1000;
    const seconds = Math.floor(elapsedMillis / MILLIS_IN_SECOND) % 60;
    const minutes = Math.floor(elapsedMillis / MILLIS_IN_MINUTE) % 60;
    const hours = Math.floor(elapsedMillis / MILLIS_IN_HOUR);

    return {
      elapsedMillis,
      milliseconds: milliseconds.toString().padStart(3, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
    };
  }

  let lastLeftTapTimestamp = 0;

  function handlePointerDownLeftSide(event) {
    const doubleTap = (event.timeStamp - lastLeftTapTimestamp) <= DOUBLE_TAP_INTERVAL_MILLIS;
    if (doubleTap) {
      timer.reset();
    }
    lastLeftTapTimestamp = event.timeStamp;
  }

  function handlePointerDownRightSide(event) {
    if (timer.running()) {
      timer.stop();
    } else {
      timer.start();
    }
  }

  function handlePointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== LEFT_MOUSE_BUTTON) return;

    const leftSideTap = event.pageX < (window.innerWidth / 2);
    if (leftSideTap) {
      handlePointerDownLeftSide(event);
    } else {
      handlePointerDownRightSide(event);
    }
  }

  function keyDownHandler(event) {
    if (event.code === 'Space') handlePointerDownRightSide();
  }

  const ones = value => value % 10;
  const tenths = value => Math.floor(value / 10);

  let interval = null;
  onMount(() => {
    interval = setInterval(() => time = newTime(timer.millis()), 30);
    window.addEventListener('keydown', keyDownHandler);
  });

  onDestroy(() => {
    clearInterval(interval);
    window.removeEventListener('keydown', keyDownHandler);
  });
</script>

<svelte:window on:pointerdown={handlePointerDown}/>

<div>
  <p>
    <!-- @NOTE: The weird comments below is for not introducing whitespace... Yeah I know, dum right? -->
    <span class='big' class:dim={time.elapsedMillis<MILLIS_IN_HOUR*10}>{tenths(time.hours)}</span><!--
 --><span class='big' class:dim={time.elapsedMillis<MILLIS_IN_HOUR}>{ones(time.hours)}:</span><!--

 --><span class='big' class:dim={time.elapsedMillis<MILLIS_IN_MINUTE*10}>{tenths(time.minutes)}</span><!--
 --><span class='big' class:dim={time.elapsedMillis<MILLIS_IN_MINUTE}>{ones(time.minutes)}:</span><!--

 --><span class='big' class:dim={time.elapsedMillis<MILLIS_IN_SECOND*10}>{tenths(time.seconds)}</span><!--
 --><span class='big' class:dim={time.elapsedMillis<MILLIS_IN_SECOND}>{ones(time.seconds)}</span><!--

 --><span class='small' class:dim={time.elapsedMillis===0}>{time.milliseconds}</span>
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
  color: white;
}

.big {
  font-size: 18vw;
}

.small {
  font-size: 9vw;
}

.dim {
  color: #333;
}
</style>
