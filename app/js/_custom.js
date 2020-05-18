(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	document.addEventListener('DOMContentLoaded', function () {
	  if (document.querySelector('.am-form')) {
	    var getCoords = function getCoords(elem) {
	      var box = elem.getBoundingClientRect();
	      return box.top + pageYOffset;
	    };

	    var inputTest = function inputTest(elem) {
	      if (elem.type == 'checkbox' || elem.type == 'radio') return true;

	      if (elem.required && !elem.value.length) {
	        elem.classList.add('am-empty');
	        return false;
	      }

	      if (regExps[elem.getAttribute('type')].test(elem.value)) {
	        elem.classList.add('am-error');
	        return false;
	      }

	      elem.classList.remove('am-empty');
	      elem.classList.remove('am-error');
	      elem.classList.add('am-correct');
	      return true;
	    };

	    // Проверка шага 1
	    var checkStepOne = function checkStepOne() {
	      if (!document.querySelector('.am-form-one__category-input').value.length) return false;
	      if (!document.querySelector('.am-form-one__checkbox:checked')) return false;
	      return true;
	    }; // Проверка шага 2


	    var checkStepTwo = function checkStepTwo() {
	      if (!document.querySelector('.am-form-two__date-input').value) {
	        document.querySelector('.am-form-two__date-notice').classList.add('am-form-two__date-notice_visible');
	        setTimeout(function () {
	          document.querySelector('.am-form-two__date-notice').classList.remove('am-form-two__date-notice_visible');
	        }, 2000);
	        return false;
	      }

	      if (!document.querySelector('.am-form-two__time-checkbox:checked')) {
	        document.querySelector('.am-form-two__time-notice').classList.add('am-form-two__time-notice_visible');
	        setTimeout(function () {
	          document.querySelector('.am-form-two__time-notice').classList.remove('am-form-two__time-notice_visible');
	        }, 2000);
	        return false;
	      }

	      var type = document.querySelector('.am-form-one__tab_active').dataset.poly;
	      document.querySelectorAll('.am-form-three__inputs').forEach(function (item) {
	        if (item.dataset.poly != type) {
	          item.querySelectorAll('input').forEach(function (input) {
	            return input.setAttribute('disabled', 'disabled');
	          });
	        } else {
	          item.querySelectorAll('input').forEach(function (input) {
	            return input.removeAttribute('disabled');
	          });
	          item.classList.add('am-form-three__inputs_active');
	        }
	      });
	      return true;
	    }; // Проверка шага 3


	    var checkStepThree = function checkStepThree() {
	      var status = true;
	      document.querySelectorAll('.am-form-three input:not(:disabled)').forEach(function (input) {
	        if (!inputTest(input)) status = false;
	      });
	      if (!document.querySelector('input[name="pay"]:checked')) status = false;
	      if (!document.querySelector('.am-form-three__personal-checkbox:checked')) status = false;
	      return status;
	    }; // Назначение активного шага


	    var setActiveStep = function setActiveStep(direction) {
	      var activeStep = document.querySelector('.am-form__step_active');
	      var activeStepNum = activeStep.dataset.step;
	      var activeTabs = document.querySelectorAll('.am-form-progress__step_active');
	      var activeTab = activeTabs[activeTabs.length - 1];

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
	    }; // Переключение шагов заполнения


	    var formTop = getCoords(document.querySelector('.am-form'));
	    var regExps = {
	      text: /[^\,A-Za-zА-Яа-я0-9 ]+/g,
	      phone: /[^0-9+-_() ]+/g
	    };
	    document.querySelectorAll('.am-form__next').forEach(function (button) {
	      button.addEventListener('click', function () {
	        setActiveStep('next');
	      });
	    });
	    document.querySelectorAll('.am-form__prev').forEach(function (button) {
	      button.addEventListener('click', function () {
	        setActiveStep('prev');
	      });
	    }); // Обновление информации в полях при смене инпутов

	    document.querySelectorAll('input[data-input]').forEach(function (item) {
	      item.addEventListener('change', function () {
	        var value = this.value;
	        document.querySelectorAll("[data-input=\"".concat(this.dataset.input, "\"]:not(input)")).forEach(function (elem) {
	          elem.innerHTML = value;
	        });
	      });
	    });
	  }
	});

	document.addEventListener('DOMContentLoaded', function () {
	  if (document.querySelector('.am-form')) {
	    // Генерация события
	    var eventGenerate = function eventGenerate(name, elem) {
	      var event;

	      if (typeof Event === 'function') {
	        event = new Event(name);
	      } else {
	        event = document.createEvent('Event');
	        event.initEvent(name, true, true);
	      }

	      elem.dispatchEvent(event);
	    }; // Назначение активного таба


	    var setAсtiveTab = function setAсtiveTab(elem) {
	      var num = elem.dataset.tab;
	      document.querySelectorAll('.am-form-one__tab').forEach(function (tab) {
	        var tabNum = tab.dataset.tab;
	        var tabContent = document.querySelector(".am-form-one__content[data-tab=\"".concat(tabNum, "\"]"));

	        if (tabNum == num) {
	          if (tab == elem) {
	            tab.classList.add('am-form-one__tab_active');
	          } else {
	            tab.classList.remove('am-form-one__tab_active');
	          }

	          tabContent.classList.add('am-form-one__content_active');

	          if (tabContent.querySelector('input')) {
	            tabContent.querySelectorAll('input').forEach(function (input) {
	              input.removeAttribute('disabled');
	            });
	          }
	        } else {
	          tab.classList.remove('am-form-one__tab_active');
	          tabContent.classList.remove('am-form-one__content_active');

	          if (tabContent.querySelector('input')) {
	            tabContent.querySelectorAll('input').forEach(function (input) {
	              input.setAttribute('disabled', 'disabled');
	            });
	          }
	        }
	      });
	    };

	    document.querySelectorAll('.am-form-one__tab').forEach(function (tab) {
	      tab.addEventListener('click', function () {
	        var num = this.dataset.tab;
	        setAсtiveTab(this);
	      });
	    }); // Всплывающие подсказки в выборе оплаты

	    document.querySelectorAll('.am-form-one__pay-question').forEach(function (item) {
	      item.addEventListener('click', function () {
	        if (document.querySelector('.am-form-one__pay-help_active')) {
	          document.querySelectorAll('.am-form-one__pay-help_active').forEach(function (item) {
	            return item.classList.remove('am-form-one__pay-help_active');
	          });
	        }

	        this.nextElementSibling.classList.toggle('am-form-one__pay-help_active');
	      });
	    }); // Закрытие всплывающих окон при клике вне

	    document.addEventListener('click', function (e) {
	      if (!e.target.closest('.am-form-one__pay-method') && document.querySelector('.am-form-one__pay-help_active')) {
	        document.querySelectorAll('.am-form-one__pay-help').forEach(function (item) {
	          return item.classList.remove('am-form-one__pay-help_active');
	        });
	      }

	      if (!e.target.closest('.am-form-one__category-block') && document.querySelector('.am-form-one__category-list_open')) {
	        document.querySelector('.am-form-one__category-list').classList.remove('am-form-one__category-list_open');
	      }

	      if (!e.target.closest('.am-form-one__place') && document.querySelector('.am-form-one__place-list_open')) {
	        document.querySelector('.am-form-one__place-list').classList.remove('am-form-one__place-list_open');
	      }
	    }); // Открытие списка с вариантми при клике по инпуту

	    document.querySelector('.am-form-one__category-input').addEventListener('click', function () {
	      this.nextElementSibling.classList.add('am-form-one__category-list_open');
	    }); // Открытие/закрытие списка при вводе в инпут

	    var variablesList = document.querySelectorAll('.am-form-one__category-item');
	    document.querySelector('.am-form-one__category-input').addEventListener('input', function () {
	      try {
	        var value = this.value;

	        if (value.length >= 3) {
	          this.nextElementSibling.classList.add('am-form-one__category-list_open'); // Автокомплит

	          var regExp = new RegExp(value);
	          variablesList.forEach(function (item) {
	            item.style.cssText = '';

	            if (!item.children[0].innerHTML.match(regExp)) {
	              item.style.display = 'none';
	            }
	          });
	        } else {
	          variablesList.forEach(function (item) {
	            item.style.cssText = '';
	          });
	        }
	      } catch (e) {
	        console.log(e);
	      }
	    }); // Скролл в списке

	    var scrollCategory = new PerfectScrollbar(document.querySelector('.am-form-one__category-list'), {
	      useBothWheelAxes: true,
	      wheelSpeed: 0.8
	    }); // Выбор варианта из списка

	    document.querySelector('.am-form-one__category-list').addEventListener('click', function (e) {
	      if (e.target.closest('.am-form-one__category-item')) {
	        var item = e.target.closest('.am-form-one__category-item');
	        var input = document.querySelector('.am-form-one__category-input');
	        var dataCategory = e.target.closest('.am-form-one__category-group').dataset.category;
	        var inputPost = document.querySelector('.am-form-one__services input[name="post"]');
	        var inputName = document.querySelector('.am-form-one__services input[name="name"]');
	        var valueFirst = item.querySelector('.am-form-one__category-name').innerHTML;
	        var value;
	        var valueSecond;

	        if (item.querySelector('.am-form-one__category-desc')) {
	          valueSecond = item.querySelector('.am-form-one__category-desc').innerHTML;
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
	        this.classList.remove('am-form-one__category-list_open');
	        document.querySelectorAll('.am-form-one__categories').forEach(function (item) {
	          if (item.dataset.category == dataCategory) {
	            item.style.display = 'block';
	            item.querySelectorAll('input').forEach(function (input) {
	              return input.removeAttribute('disabled');
	            });
	          } else {
	            item.style.display = 'none';
	            item.querySelectorAll('input').forEach(function (input) {
	              return input.setAttribute('disabled', 'disabled');
	            });
	          }
	        });
	      }
	    }); // открытие выбора филиала

	    document.querySelector('.am-form-one__place-button').addEventListener('click', function () {
	      this.nextElementSibling.classList.toggle('am-form-one__place-list_open');
	    }); // Скролл в выборе филиала

	    var scrollPlace = new PerfectScrollbar(document.querySelector('.am-form-one__place-list'), {
	      useBothWheelAxes: true,
	      wheelSpeed: 0.8
	    }); // Выбор филиала

	    document.querySelector('.am-form-one__place-list').addEventListener('click', function (e) {
	      if (e.target.closest('.am-form-one__place-item')) {
	        var item = e.target.closest('.am-form-one__place-item');
	        var input = document.querySelector('.am-form-one__place-input');
	        var value = item.innerHTML;
	        input.setAttribute('value', value);
	        eventGenerate('change', input);
	        this.classList.remove('am-form-one__place-list_open');
	      }
	    }); // Выбор даты

	    if (document.querySelector('.am-form-one__date-button')) {
	      var setFormDate = function setFormDate(date1, date2) {
	        var input = document.querySelector('.am-form-one__date-input');
	        var value;

	        if (date1.toLocaleDateString('ru-RU') == date2.toLocaleDateString('ru-RU')) {
	          value = date1.toLocaleDateString('ru-RU');
	        } else {
	          value = "".concat(date1.toLocaleDateString('ru-RU'), "-").concat(date2.toLocaleDateString('ru-RU'));
	        }

	        input.setAttribute('value', value);
	        input.dataset.startDate = date1;
	        input.dataset.endDate = date2;
	        eventGenerate('change', input);
	        document.querySelector('.am-form-one__date-container').classList.remove('am-form-one__date-container_open');
	      };

	      document.querySelector('.am-form-one__date-button').addEventListener('click', function () {
	        this.nextElementSibling.classList.toggle('am-form-one__date-container_open');
	      });
	      var date = new Date();
	      date.setDate(date.getDate() + 30);
	      var dateString = date.toISOString().split('T')[0];
	      var datePicker = new Litepicker({
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
	          previousMonth: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"9px\" height=\"14px\"><path fill-rule=\"evenodd\"  fill=\"rgb(34, 34, 34)\"d=\"M7.809,1.127 L1.737,7.000 L7.809,12.872 C8.092,13.131 8.092,13.550 7.809,13.809 C7.527,14.067 7.069,14.067 6.786,13.809 L0.229,7.468 C-0.053,7.210 -0.053,6.790 0.229,6.531 L6.786,0.191 C7.069,-0.068 7.527,-0.068 7.809,0.191 C8.092,0.449 8.092,0.869 7.809,1.127 Z\"/></svg>",
	          nextMonth: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"9px\" height=\"14px\"><path fill-rule=\"evenodd\"  fill=\"rgb(34, 34, 34)\"d=\"M7.809,1.127 L1.737,7.000 L7.809,12.872 C8.092,13.131 8.092,13.550 7.809,13.809 C7.527,14.067 7.069,14.067 6.786,13.809 L0.229,7.468 C-0.053,7.210 -0.053,6.790 0.229,6.531 L6.786,0.191 C7.069,-0.068 7.527,-0.068 7.809,0.191 C8.092,0.449 8.092,0.869 7.809,1.127 Z\"/></svg>"
	        }
	      });
	    }

	    document.querySelectorAll('.am-form-one__specialists-radio').forEach(function (radio) {
	      radio.addEventListener('change', function () {
	        document.querySelectorAll('.am-form-one__specialists-item').forEach(function (item) {
	          item.classList.remove('am-form-one__specialists-item_active');
	        });
	        this.closest('.am-form-one__specialists-item').classList.add('am-form-one__specialists-item_active');
	      });
	    });
	    document.querySelector('.am-form-one__specialists-link').addEventListener('click', function () {
	      document.querySelector('.am-form-one__specialists-items').classList.toggle('am-form-one__specialists-items_all');
	    });
	    document.querySelector('.am-form-one__services-link').addEventListener('click', function () {
	      document.querySelector('.am-form-one__services-list').classList.toggle('am-form-one__services-list_all');
	    });
	    document.querySelectorAll('input[name="specialist"]').forEach(function (input) {
	      input.addEventListener('change', function () {
	        var elem = this.closest('.am-form-one__specialists-item');
	        var price = elem.querySelector('.am-form-one__specialists-price').innerHTML;
	        var service = elem.querySelector('.am-form-one__specialists-service').innerHTML;
	        document.querySelector('input[name="price"]').value = price;
	        eventGenerate('change', document.querySelector('input[name="price"]'));
	        document.querySelector('input[name="service"]').value = service;
	        eventGenerate('change', document.querySelector('input[name="service"]'));
	      });
	    });
	    document.querySelectorAll('.am-form-one__services-radio').forEach(function (input) {
	      if (input.checked) {
	        var elem = input.closest('.am-form-one__services-item');
	        var price = elem.querySelector('.am-form-one__services-price').innerHTML;
	        var inputPrice = document.querySelector('.am-form-one__services input[name="price"]');
	        inputPrice.value = price;
	        eventGenerate('change', inputPrice);
	      }

	      input.addEventListener('change', function () {
	        var elem = this.closest('.am-form-one__services-item');
	        var price = elem.querySelector('.am-form-one__services-price').innerHTML;
	        var inputPrice = document.querySelector('.am-form-one__services input[name="price"]');
	        inputPrice.value = price;
	        eventGenerate('change', inputPrice);
	      });
	    });
	  }
	});

	document.addEventListener('DOMContentLoaded', function () {
	  if (document.querySelector('.am-form')) {
	    // Генерация события
	    var eventGenerate = function eventGenerate(name, elem) {
	      var event;

	      if (typeof Event === 'function') {
	        event = new Event(name);
	      } else {
	        event = document.createEvent('Event');
	        event.initEvent(name, true, true);
	      }

	      elem.dispatchEvent(event);
	    }; // Назначение дней, которые нельзя выбрать


	    var testArrayLockedDays = ["2020-05-20", "2020-05-14", "2020-05-10", "2020-05-11"]; // Выбор даты

	    if (document.querySelector('.am-form-two__date')) {
	      var date = new Date();
	      date.setDate(date.getDate() + 30);
	      var dateString = date.toISOString().split('T')[0];
	      var datePicker = new Litepicker({
	        element: document.querySelector('.am-form-two__date-input'),
	        lang: 'ru-RU',
	        maxDate: dateString,
	        minDate: new Date(),
	        inlineMode: true,
	        parentEl: document.querySelector('.am-form-two__date-container'),
	        onSelect: function onSelect(date1, date2) {
	          document.querySelector('.am-form-two__date-input').value = date1.toLocaleDateString('ru-RU');
	          eventGenerate("change", document.querySelector('.am-form-two__date-input'));
	          document.querySelector('.am-form-two__time').classList.add('am-form-two__time_visible'); // Нужно добавить условие при котором будет выводиться всплывающее окно

	          if (document.querySelector('.am-form-two__other')) {
	            document.querySelector('.am-form-two__other').classList.add('am-form-two__other_visible');
	            setTimeout(function () {
	              document.querySelector('.am-form-two__other').classList.remove('am-form-two__other_visible');
	            }, 3000);
	          }
	        },
	        buttonText: {
	          previousMonth: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"9px\" height=\"14px\"><path fill-rule=\"evenodd\"  fill=\"rgb(34, 34, 34)\"d=\"M7.809,1.127 L1.737,7.000 L7.809,12.872 C8.092,13.131 8.092,13.550 7.809,13.809 C7.527,14.067 7.069,14.067 6.786,13.809 L0.229,7.468 C-0.053,7.210 -0.053,6.790 0.229,6.531 L6.786,0.191 C7.069,-0.068 7.527,-0.068 7.809,0.191 C8.092,0.449 8.092,0.869 7.809,1.127 Z\"/></svg>",
	          nextMonth: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"9px\" height=\"14px\"><path fill-rule=\"evenodd\"  fill=\"rgb(34, 34, 34)\"d=\"M7.809,1.127 L1.737,7.000 L7.809,12.872 C8.092,13.131 8.092,13.550 7.809,13.809 C7.527,14.067 7.069,14.067 6.786,13.809 L0.229,7.468 C-0.053,7.210 -0.053,6.790 0.229,6.531 L6.786,0.191 C7.069,-0.068 7.527,-0.068 7.809,0.191 C8.092,0.449 8.092,0.869 7.809,1.127 Z\"/></svg>"
	        }
	      }); // Изменение недоступных дней

	      datePicker.setOptions({
	        lockDays: testArrayLockedDays
	      }); // Установка доступных дат при выборе даты на 1 шаге

	      document.querySelector('.am-form-one__date-input').addEventListener('change', function () {
	        var startDate = this.dataset.startDate;
	        var endDate = this.dataset.endDate;
	        datePicker.setOptions({
	          minDate: startDate,
	          maxDate: endDate
	        });
	      });
	    }
	  }
	});

	document.addEventListener('DOMContentLoaded', function () {
	  if (document.querySelector('.am-form')) {
	    var inputTest = function inputTest(elem) {
	      try {
	        if (elem.required && !elem.value.length) {
	          elem.classList.add('am-empty');
	          return;
	        }

	        if (regExps[elem.dataset.type].test(elem.value)) {
	          elem.classList.add('am-error');
	          return;
	        }

	        elem.classList.remove('am-empty');
	        elem.classList.remove('am-error');
	        elem.classList.add('am-correct');
	      } catch (e) {
	        console.log(e);
	      }
	    };

	    var regExps = {
	      text: /[^\,A-Za-zА-Яа-я0-9 ]+/g,
	      phone: /[^0-9+-_() ]+/g,
	      date: /[^0-9.]+/g
	    };
	    document.querySelectorAll('.am-form-three__inputs-input').forEach(function (input) {
	      if (input.value.length) {
	        input.nextElementSibling.style.display = 'none';
	      }

	      input.addEventListener('input', function () {
	        // Скрытие/показ плейсхолдера
	        try {
	          if (this.value.length) {
	            this.nextElementSibling.style.display = 'none';
	          } else {
	            this.nextElementSibling.style.display = 'flex';
	          }

	          this.value = this.value.replace(regExps[this.dataset.type], '');
	        } catch (e) {
	          console.log(e);
	        }
	      });
	      input.addEventListener('change', function () {
	        inputTest(this);
	      });
	    }); // Всплывающее окно в выборе оплаты

	    document.querySelectorAll('.am-form-three__checkbox').forEach(function (input) {
	      input.addEventListener('change', function () {
	        // Условие просто для показа, надо переписать
	        if (input.checked) {
	          document.querySelector('.am-form-three__pay-help').classList.add('am-form-three__pay-help_active');
	        }
	      });
	    });

	    if (document.querySelector('.am-form-three__pay-close')) {
	      document.querySelector('.am-form-three__pay-close').addEventListener('click', function () {
	        this.parentElement.classList.remove('am-form-three__pay-help_active');
	      });
	    }
	  }
	});

}));
