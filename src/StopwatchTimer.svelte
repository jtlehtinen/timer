<script>
  import { onDestroy } from 'svelte';
  import Timer from './timer.js';

  let time = {
    milliseconds: "000",
    seconds: "00",
    minutes: "00",
    hours: "00",
  };

  let timer = new Timer();

  function updateTime() {
    const now = timer.millis();
    const milliseconds = now % 1000;
    const seconds = Math.floor(now / 1000) % 60;
    const minutes = Math.floor(now / (1000 * 60)) % 60;
    const hours = Math.floor(now / (1000 * 60 * 60));

    time.milliseconds = milliseconds.toString().padStart(3, '0');
    time.seconds = seconds.toString().padStart(2, '0');
    time.minutes = minutes.toString().padStart(2, '0');
    time.hours = hours.toString().padStart(2, '0');
  }

  let interval = setInterval(() => updateTime(), 10);

	onDestroy(() => clearInterval(interval));
</script>

<div class="container">
  <p><span class="big">{time.hours}:{time.minutes}:{time.seconds}</span><span class="small">{time.milliseconds}</span></p>

  <div class="controls">
    <button on:click={() => timer.reset()}>Reset</button>
    {#if timer.running() && time} <!-- @TODO: hack -->
    <button on:click={() => timer.stop()}>Stop</button>
    {:else}
    <button on:click={() => timer.start()}>Start</button>
    {/if}
  </div>
</div>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.controls {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 5.0em;
}

button {
  width: 40%;
  font-size: 3.0em;
}

p {
  text-align: center;
}

.big {
  font-size: 10.0em;
}

.small {
  font-size: 5.0em;
}
</style>
