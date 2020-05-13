document.addEventListener('DOMContentLoaded', function () {
	if (document.querySelector('.am-form')) {
		function getCoords(elem) {
			let box = elem.getBoundingClientRect();
		
			return box.top + pageYOffset
		}

		const formTop = getCoords(document.querySelector('.am-form'))

		function inputTest(elem) {
			if (elem.type == 'checkbox' || elem.type == 'radio') return true

			if (elem.required && !elem.value.length) {
				elem.classList.add('am-empty')
				return false
			}

			if (regExps[elem.getAttribute('type')].test(elem.value)) {
				elem.classList.add('am-error')
				return false
			}

			elem.classList.remove('am-empty');
			elem.classList.remove('am-error');
			elem.classList.add('am-correct');
			return true
		}

		const regExps = {
			text: /[^\,A-Za-zА-Яа-я0-9 ]+/g,
			phone: /[^0-9+-_() ]+/g
		}

		// Проверка шага 1
		function checkStepOne() {
			if (!document.querySelector('.am-form-one__category-input').value.length) return false;
			if (!document.querySelector('.am-form-one__checkbox:checked')) return false;

			return true;
		}

		// Проверка шага 2
		function checkStepTwo() {
			if (!document.querySelector('.am-form-two__date-input').value) {
				document.querySelector('.am-form-two__date-notice').classList.add('am-form-two__date-notice_visible');
				setTimeout(function() {
					document.querySelector('.am-form-two__date-notice').classList.remove('am-form-two__date-notice_visible');
				}, 2000)
				return false;
			}

			if (!document.querySelector('.am-form-two__time-checkbox:checked')) {
				document.querySelector('.am-form-two__time-notice').classList.add('am-form-two__time-notice_visible');
				setTimeout(function() {
					document.querySelector('.am-form-two__time-notice').classList.remove('am-form-two__time-notice_visible');
				}, 2000)
				return false;
			}

			const type = document.querySelector('.am-form-one__tab_active').dataset.poly;
			document.querySelectorAll('.am-form-three__inputs').forEach(item => {
				if (item.dataset.poly != type) {
					item.querySelectorAll('input').forEach(input => input.setAttribute('disabled', 'disabled'))
				} else {
					item.querySelectorAll('input').forEach(input => input.removeAttribute('disabled'))
					item.classList.add('am-form-three__inputs_active')
				}
			})

			return true;
		}

		// Проверка шага 3
		function checkStepThree() {
			let status = true;
			document.querySelectorAll('.am-form-three input:not(:disabled)').forEach(input => {
				if (!inputTest(input)) status = false;
			})

			if (!document.querySelector('input[name="pay"]:checked')) status = false;

			if (!document.querySelector('.am-form-three__personal-checkbox:checked')) status = false;

			return status;
		}

		// Назначение активного шага
		function setActiveStep(direction) {
			const activeStep = document.querySelector('.am-form__step_active');
			const activeStepNum = activeStep.dataset.step;
			const activeTabs = document.querySelectorAll('.am-form-progress__step_active');
			const activeTab = activeTabs[activeTabs.length - 1];

			if (direction == 'prev') {
				activeStep.classList.remove('am-form__step_active');
				activeStep.previousElementSibling.classList.add('am-form__step_active');
				activeTab.classList.remove('am-form-progress__step_active');
			} else if (direction == 'next') {
				if (activeStepNum == 1) {
					if (!checkStepOne()) return;
				} else if (activeStepNum == 2) {
					if (!checkStepTwo()) return;
				} else if (activeStepNum == 3) {
					if (!checkStepThree()) return;
				}

				activeStep.classList.remove('am-form__step_active');
				activeStep.nextElementSibling.classList.add('am-form__step_active');
				activeTab.nextElementSibling.classList.add('am-form-progress__step_active');

				window.scrollTo(0, formTop);
			}
		}

		// Переключение шагов заполнения
		document.querySelectorAll('.am-form__next').forEach(button => {
			button.addEventListener('click', function() {
				setActiveStep('next');
			})
		})

		document.querySelectorAll('.am-form__prev').forEach(button => {
			button.addEventListener('click', function() {
				setActiveStep('prev');
			})
		})

		// Обновление информации в полях при смене инпутов
		document.querySelectorAll('input[data-input]').forEach(item => {
			item.addEventListener('change', function() {
				const value = this.value;

				document.querySelectorAll(`[data-input="${this.dataset.input}"]:not(input)`).forEach(elem => {
					elem.innerHTML = value;
				})
			})
		})
	}
})