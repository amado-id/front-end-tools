document.addEventListener('DOMContentLoaded', function () {
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

		// Назначение активного таба
		function setAсtiveTab(elem) {
			const num = elem.dataset.tab;
			document.querySelectorAll('.am-form-one__tab').forEach(tab => {
				const tabNum = tab.dataset.tab;
				const tabContent = document.querySelector(`.am-form-one__content[data-tab="${tabNum}"]`);

				if (tabNum == num) {
					if (tab == elem) {
						tab.classList.add('am-form-one__tab_active');
					} else {
						tab.classList.remove('am-form-one__tab_active');
					}
					tabContent.classList.add('am-form-one__content_active');
					if (tabContent.querySelector('input')) {
						tabContent.querySelectorAll('input').forEach(input => {
							input.removeAttribute('disabled');
						})
					}
				} else {
					tab.classList.remove('am-form-one__tab_active');
					tabContent.classList.remove('am-form-one__content_active');
					if (tabContent.querySelector('input')) {
						tabContent.querySelectorAll('input').forEach(input => {
							input.setAttribute('disabled', 'disabled');
						})
					}
				}
			})
		}

		document.querySelectorAll('.am-form-one__tab').forEach(tab => {
			tab.addEventListener('click', function () {
				const num = this.dataset.tab;
				setAсtiveTab(this);
			})
		})

		// Всплывающие подсказки в выборе оплаты
		document.querySelectorAll('.am-form-one__pay-question').forEach(item => {
			item.addEventListener('click', function () {
				this.nextElementSibling.classList.toggle('am-form-one__pay-help_active');
			});
		})

		// Закрытие всплывающих окон при клике вне
		document.addEventListener('click', function (e) {
			if (!e.target.closest('.am-form-one__pay-method') && document.querySelector('.am-form-one__pay-help_active')) {
				document.querySelectorAll('.am-form-one__pay-help').forEach(item => item.classList.remove('am-form-one__pay-help_active'));
			}

			if (!e.target.closest('.am-form-one__category-block') && document.querySelector('.am-form-one__category-list_open')) {
				document.querySelector('.am-form-one__category-list').classList.remove('am-form-one__category-list_open')
			}

			if (!e.target.closest('.am-form-one__place') && document.querySelector('.am-form-one__place-list_open')) {
				document.querySelector('.am-form-one__place-list').classList.remove('am-form-one__place-list_open')
			}
		})

		// Открытие списка с вариантми при клике по инпуту
		document.querySelector('.am-form-one__category-input').addEventListener('click', function () {
			this.nextElementSibling.classList.add('am-form-one__category-list_open')
		})

		// Открытие/закрытие списка при вводе в инпут
		document.querySelector('.am-form-one__category-input').addEventListener('input', function () {
			if (this.value.length) {
				this.nextElementSibling.classList.add('am-form-one__category-list_open')
			} else {
				this.nextElementSibling.classList.remove('am-form-one__category-list_open')
			}
		})

		// Скролл в списке
		const scrollCategory = new PerfectScrollbar(document.querySelector('.am-form-one__category-list'), {
			useBothWheelAxes: true,
			wheelSpeed: 0.8
		});

		// Выбор варианта из списка
		document.querySelector('.am-form-one__category-list').addEventListener('click', function (e) {
			if (e.target.closest('.am-form-one__category-item')) {

				const item = e.target.closest('.am-form-one__category-item');
				const input = document.querySelector('.am-form-one__category-input');
				const dataCategory = e.target.closest('.am-form-one__category-group').dataset.category;
				const inputPost = document.querySelector('.am-form-one__services input[name="post"]');
				const inputName = document.querySelector('.am-form-one__services input[name="name"]');

				const valueFirst = item.querySelector('.am-form-one__category-name').innerHTML;
				let value;
				let valueSecond;

				if (item.querySelector('.am-form-one__category-desc')) {
					valueSecond = item.querySelector('.am-form-one__category-desc').innerHTML
				}
				
				if (valueSecond) {
					value = valueFirst + ', ' + valueSecond;
					inputName.value = valueFirst;
					inputPost.value = valueSecond;
					eventGenerate('change', inputName);
					eventGenerate('change', inputPost);
				} else {
					value = valueFirst;
				}
				
				input.value = value;
				input.dataset.category = dataCategory;
				eventGenerate('change', input);

				this.classList.remove('am-form-one__category-list_open')

				document.querySelectorAll('.am-form-one__categories').forEach(item => {
					if (item.dataset.category == dataCategory) {
						item.style.display = 'block';
						item.querySelectorAll('input').forEach(input => input.removeAttribute('disabled'));
					} else {
						item.style.display = 'none';
						item.querySelectorAll('input').forEach(input => input.setAttribute('disabled', 'disabled'));
					}
				})
			}
		})

		// открытие выбора филиала
		document.querySelector('.am-form-one__place-button').addEventListener('click', function () {
			this.nextElementSibling.classList.toggle('am-form-one__place-list_open');
		})

		// Скролл в выборе филиала
		const scrollPlace = new PerfectScrollbar(document.querySelector('.am-form-one__place-list'), {
			useBothWheelAxes: true,
			wheelSpeed: 0.8
		});

		// Выбор филиала
		document.querySelector('.am-form-one__place-list').addEventListener('click', function (e) {
			if (e.target.closest('.am-form-one__place-item')) {
				const item = e.target.closest('.am-form-one__place-item');
				const input = document.querySelector('.am-form-one__place-input');
				const value = item.innerHTML;

				input.setAttribute('value', value);
				eventGenerate('change', input);

				this.classList.remove('am-form-one__place-list_open')
			}
		})

		// Выбор даты
		if (document.querySelector('.am-form-one__date-button')) {
			function setFormDate(date1, date2) {
				const input = document.querySelector('.am-form-one__date-input');
				let value;

				if (date1.toLocaleDateString('ru-RU') == date2.toLocaleDateString('ru-RU')) {
					value = date1.toLocaleDateString('ru-RU');
				} else {
					value = `${date1.toLocaleDateString('ru-RU')}-${date2.toLocaleDateString('ru-RU')}`;
				}

				input.setAttribute('value', value);
				input.dataset.startDate = date1;
				input.dataset.endDate = date2;
				eventGenerate('change', input);

				document.querySelector('.am-form-one__date-container').classList.remove('am-form-one__date-container_open');
			}

			document.querySelector('.am-form-one__date-button').addEventListener('click', function () {
				this.nextElementSibling.classList.toggle('am-form-one__date-container_open');
			})

			var date = new Date();
			date.setDate(date.getDate() + 30);
			var dateString = date.toISOString().split('T')[0];

			const datePicker = new Litepicker({
				element: document.querySelector('.am-form-one__date-button'),
				singleMode: false,
				lang: 'ru-RU',
				maxDate: dateString,
				minDate: new Date(),
				inlineMode: true,
				showTooltip: false,
				parentEl: document.querySelector('.am-form-one__date-container'),
				onSelect: setFormDate,
				buttonText: {
					previousMonth: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="14px"><path fill-rule="evenodd"  fill="rgb(34, 34, 34)"d="M7.809,1.127 L1.737,7.000 L7.809,12.872 C8.092,13.131 8.092,13.550 7.809,13.809 C7.527,14.067 7.069,14.067 6.786,13.809 L0.229,7.468 C-0.053,7.210 -0.053,6.790 0.229,6.531 L6.786,0.191 C7.069,-0.068 7.527,-0.068 7.809,0.191 C8.092,0.449 8.092,0.869 7.809,1.127 Z"/></svg>`,
					nextMonth: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="14px"><path fill-rule="evenodd"  fill="rgb(34, 34, 34)"d="M7.809,1.127 L1.737,7.000 L7.809,12.872 C8.092,13.131 8.092,13.550 7.809,13.809 C7.527,14.067 7.069,14.067 6.786,13.809 L0.229,7.468 C-0.053,7.210 -0.053,6.790 0.229,6.531 L6.786,0.191 C7.069,-0.068 7.527,-0.068 7.809,0.191 C8.092,0.449 8.092,0.869 7.809,1.127 Z"/></svg>`
				}
			});
		}

		document.querySelectorAll('.am-form-one__specialists-radio').forEach(radio => {
			radio.addEventListener('change', function () {
				document.querySelectorAll('.am-form-one__specialists-item').forEach(item => {
					item.classList.remove('am-form-one__specialists-item_active')
				})
				this.closest('.am-form-one__specialists-item').classList.add('am-form-one__specialists-item_active')
			})
		})

		document.querySelector('.am-form-one__specialists-link').addEventListener('click', function () {
			document.querySelector('.am-form-one__specialists-items').classList.toggle('am-form-one__specialists-items_all')
		})

		document.querySelector('.am-form-one__services-link').addEventListener('click', function () {
			document.querySelector('.am-form-one__services-list').classList.toggle('am-form-one__services-list_all')
		})

		document.querySelectorAll('input[name="specialist"]').forEach(input => {
			input.addEventListener('change', function() {
				const elem = this.closest('.am-form-one__specialists-item');
				const price = elem.querySelector('.am-form-one__specialists-price').innerHTML;
				const service = elem.querySelector('.am-form-one__specialists-service').innerHTML;

				document.querySelector('input[name="price"]').value = price;
				eventGenerate('change', document.querySelector('input[name="price"]'));

				document.querySelector('input[name="service"]').value = service;
				eventGenerate('change', document.querySelector('input[name="service"]'));
			})
		})

		document.querySelectorAll('.am-form-one__services-radio').forEach(input => {
			if (input.checked) {
				const elem = input.closest('.am-form-one__services-item');
				const price = elem.querySelector('.am-form-one__services-price').innerHTML;
				const inputPrice = document.querySelector('.am-form-one__services input[name="price"]');

				inputPrice.value = price;
				eventGenerate('change', inputPrice);
			}
			input.addEventListener('change', function() {
				const elem = this.closest('.am-form-one__services-item');
				const price = elem.querySelector('.am-form-one__services-price').innerHTML;
				const inputPrice = document.querySelector('.am-form-one__services input[name="price"]');

				inputPrice.value = price;
				eventGenerate('change', inputPrice);
			})
		})
	}
})