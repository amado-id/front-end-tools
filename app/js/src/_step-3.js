document.addEventListener('DOMContentLoaded', function () {
	if (document.querySelector('.am-form')) {
		function inputTest(elem) {
			try {
				if (elem.required && !elem.value.length) {
					elem.classList.add('am-empty')
					return
				}

				if (regExps[elem.dataset.type].test(elem.value)) {
					elem.classList.add('am-error')
					return
				}

				elem.classList.remove('am-empty');
				elem.classList.remove('am-error');
				elem.classList.add('am-correct');
			} catch (e) {
				console.log(e)
			}
		}

		const regExps = {
			text: /[^\,A-Za-zА-Яа-я0-9 ]+/g,
			phone: /[^0-9+-_() ]+/g,
			date: /[^0-9.]+/g
		}

		document.querySelectorAll('.am-form-three__inputs-input').forEach(input => {
			if (input.value.length) {
				input.nextElementSibling.style.display = 'none'
			}
			input.addEventListener('input', function () {
				// Скрытие/показ плейсхолдера
				try {
					if (this.value.length) {
						this.nextElementSibling.style.display = 'none'
					} else {
						this.nextElementSibling.style.display = 'flex'
					}
	
					this.value = this.value.replace(regExps[this.dataset.type], '');
				} catch (e) {
					console.log(e)
				}
			})

			input.addEventListener('change', function () {
				inputTest(this)
			})
		})

		// Всплывающее окно в выборе оплаты
		document.querySelectorAll('.am-form-three__checkbox').forEach(input => {
			input.addEventListener('change', function () {
				// Условие просто для показа, надо переписать
				if (input.checked) {
					document.querySelector('.am-form-three__pay-help').classList.add('am-form-three__pay-help_active');
				}
			})
		})

		if (document.querySelector('.am-form-three__pay-close')) {
			document.querySelector('.am-form-three__pay-close').addEventListener('click', function () {
				this.parentElement.classList.remove('am-form-three__pay-help_active');
			})
		}
	}
})