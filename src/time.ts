const time = (content: string[], cb: (letter: string) => void, speed: () => number) => {
  let resolve: () => void;

  const promise = new Promise<void>((res) => {
    resolve = res;
  });
  
  let frame: number;

	const enqueue = () => {
		frame = requestAnimationFrame(queue);
	};

	const dequeue = () => {
		cancelAnimationFrame(frame);
	};

	let timeout = 0;
	let start = 0;

  let index = 0;

	const queue: FrameRequestCallback = (time) => {
		if (time >= start + timeout) {
			start = time;
			timeout = speed();

			cb(content[index++]);
      enqueue();
		} else if (index === content.length) {
			dequeue();
      resolve();
		} else {
			enqueue();
		}
	};

  enqueue()

  return promise;
}

export { time }