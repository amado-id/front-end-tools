document.addEventListener('DOMContentLoaded', function() {
	if (document.querySelector('.am-form')) {
		// Генерация события
		function eventGenerate(name, elem) {
			let event;
			if (typeof (Event) === 'function') {
				event = new Event(name);
			} else {
				event = document.createEvent('Event');
				event.initEvent(name, true, true);
			}
			elem.dispatchEvent(event);
		}

		// Назначение дней, которые нельзя выбрать
		const testArrayLockedDays = [
			"2020-05-20",
			"2020-05-14",
			"2020-05-10",
			"2020-05-11"
		]

		// Выбор даты
		if (document.querySelector('.am-form-two__date')) {
			var date = new Date();
			date.setDate(date.getDate() + 30);
			var dateString = date.toISOString().split('T')[0];

			const datePicker = new Litepicker({
				element: document.querySelector('.am-form-two__date-input'),
				lang: 'ru-RU',
				maxDate: dateString,
				minDate: new Date(),
				inlineMode: true,
				parentEl: document.querySelector('.am-form-two__date-container'),
				onSelect: function(date1, date2) {
					document.querySelector('.am-form-two__date-input').value = date1.toLocaleDateString('ru-RU');
					eventGenerate("change", document.querySelector('.am-form-two__date-input'));

					document.querySelector('.am-form-two__time').classList.add('am-form-two__time_visible');

					// Нужно добавить условие при котором будет выводиться всплывающее окно
					if (document.querySelector('.am-form-two__other')) {
						document.querySelector('.am-form-two__other').classList.add('am-form-two__other_visible');
						setTimeout(function() {
							document.querySelector('.am-form-two__other').classList.remove('am-form-two__other_visible');
						}, 3000)
					}
				},
				buttonText: {
					previousMonth: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="14px"><path fill-rule="evenodd"  fill="rgb(34, 34, 34)"d="M7.809,1.127 L1.737,7.000 L7.809,12.872 C8.092,13.131 8.092,13.550 7.809,13.809 C7.527,14.067 7.069,14.067 6.786,13.809 L0.229,7.468 C-0.053,7.210 -0.053,6.790 0.229,6.531 L6.786,0.191 C7.069,-0.068 7.527,-0.068 7.809,0.191 C8.092,0.449 8.092,0.869 7.809,1.127 Z"/></svg>`,
					nextMonth: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="14px"><path fill-rule="evenodd"  fill="rgb(34, 34, 34)"d="M7.809,1.127 L1.737,7.000 L7.809,12.872 C8.092,13.131 8.092,13.550 7.809,13.809 C7.527,14.067 7.069,14.067 6.786,13.809 L0.229,7.468 C-0.053,7.210 -0.053,6.790 0.229,6.531 L6.786,0.191 C7.069,-0.068 7.527,-0.068 7.809,0.191 C8.092,0.449 8.092,0.869 7.809,1.127 Z"/></svg>`
				}
			});

			// Изменение недоступных дней
			datePicker.setOptions({
				lockDays: testArrayLockedDays
			})

			// Установка доступных дат при выборе даты на 1 шаге
			document.querySelector('.am-form-one__date-input').addEventListener('change', function() {
				const startDate = this.dataset.startDate;
				const endDate = this.dataset.endDate;

				datePicker.setOptions({
					minDate: startDate,
					maxDate: endDate
				})
			})
		}
	}
})