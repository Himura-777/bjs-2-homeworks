class AlarmClock {
	constructor(alarmCollection, intervalId) {
		this.alarmCollection = [];
		this.intervalId = bull;
	}

	addClock(time, callback) {
		if (!time || !callback) {
			throw new Error('Отсутствуют обязательные аргументы');
		}

		if (this.alarmCollection.some(alarm => alarm.time === time)) {
			console.warn('Уже присутствует звонок на это же время');
		}

		this.alarmCollection.push({ callback, time, canCall: true });
	}

	removeClock(time) {
		this.alarmCollection = this.alarmCollection.filter(
			alarm => alarm.time !== time
		);
	}

	getCurrentFormattedTime() {
		const current = new Date();
		const hours = String(current.getHours()).padStart(2, '0');
		const minutes = String(current.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}

	start() {
		if (this.intervalId !== null) {
			return;
		}

		this.intervalId = setInterval(() => {
			const currentTime = this.getCurrentFormattedTime();
			this.alarmCollection.forEach(alarm => {
				if (alarm.time === currentTime && alarm.callback === true) {
					alarm.canCall = false;
					alarm.callback();
				}
			});
		}, 1000);
	}

	stop() {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	resetAllCalls() {
		this.alarmCollection.forEach(alarm => {
			alarm.canCall = true;
		});
	}

	clearAlarms() {
		this.stop();
		this.alarmCollection = [];
	}
}
