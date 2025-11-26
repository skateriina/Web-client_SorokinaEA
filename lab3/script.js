/* lab3 script: обработка dialog + валидация формы */
/* Все обработчики — именованные функции (нет анонимных в addEventListener) */

(function () {
  // элементы
  var openBtn = document.getElementById('openRegisterBtn');
  var dialog = document.getElementById('registerDialog');
  var form = document.getElementById('registerForm');
  var closeBtn = document.getElementById('closeBtn');
  var showPwdBtn = document.getElementById('showPwdBtn');
  var passwordInput = document.getElementById('passwordInput');
  var output = document.getElementById('formOutput');

  // ошибки
  var nameInput = document.getElementById('nameInput');
  var emailInput = document.getElementById('emailInput');
  var nameError = document.getElementById('nameError');
  var emailError = document.getElementById('emailError');
  var passwordError = document.getElementById('passwordError');

  // --- 1. Открыть модалку ---
  function onOpenBtnClick () {
    // showModal — встроенный метод dialog
    dialog.showModal();
    // установить фокус на первом поле
    nameInput.focus();
  }
  openBtn.addEventListener('click', onOpenBtnClick);

  // --- 2. Закрыть — кнопка ---
  function onCloseBtnClick () {
    dialog.close();
  }
  closeBtn.addEventListener('click', onCloseBtnClick);

  // --- 3. Закрытие при клике по фону (вне окна) ---
  // нажимаем на dialog (он получает click), если целевой элемент === dialog — значит кликнули по фону
  function onDialogClick (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  }
  dialog.addEventListener('click', onDialogClick);

  // --- 4. Показ/скрытие пароля (pointerdown/pointerup) ---
  function onShowPwdPointerDown (event) {
    // указываем что кнопка "нажата"
    showPwdBtn.setAttribute('aria-pressed', 'true');
    passwordInput.type = 'text';
  }

  function onShowPwdPointerUp () {
    showPwdBtn.setAttribute('aria-pressed', 'false');
    passwordInput.type = 'password';
  }

  showPwdBtn.addEventListener('pointerdown', onShowPwdPointerDown);
  showPwdBtn.addEventListener('pointerup', onShowPwdPointerUp);
  showPwdBtn.addEventListener('pointercancel', onShowPwdPointerUp);
  showPwdBtn.addEventListener('pointerleave', onShowPwdPointerUp);

  // --- 5. Валидация на blur для каждого поля ---
  // общая функция, использует validity API
  function getValidationMessage (input) {
    var v = input.validity;
    if (v.valueMissing) {
      return 'Поле обязательно для заполнения';
    }
    if (v.typeMismatch) {
      return 'Неверный формат';
    }
    if (v.tooShort) {
      return 'Слишком короткое значение';
    }
    // default
    return 'Неверное значение';
  }

  function validateField (event) {
    var input = event.target;
    var id = input.id;
    var errorEl = null;

    if (id === 'nameInput') errorEl = nameError;
    if (id === 'emailInput') errorEl = emailError;
    if (id === 'passwordInput') errorEl = passwordError;

    if (!input.checkValidity()) {
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = getValidationMessage(input);
        errorEl.removeAttribute('hidden');
      }
    } else {
      input.removeAttribute('aria-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.setAttribute('hidden', '');
      }
    }
  }

  nameInput.addEventListener('blur', validateField);
  emailInput.addEventListener('blur', validateField);
  passwordInput.addEventListener('blur', validateField);

  // --- 6. Submit формы ---
  function onFormSubmit (event) {
    event.preventDefault();

    // вызываем встроенную проверку
    var firstInvalid = form.querySelector(':invalid');

    if (firstInvalid) {
      // если есть неверное поле — фокус на нём и выполняем валидацию (чтобы показать сообщение)
      firstInvalid.focus();
      firstInvalid.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
      return;
    }

    // если все валидно — собираем FormData
    var fd = new FormData(form);
    var obj = {};
    fd.forEach(function (value, key) {
      obj[key] = value;
    });

    // Выводим результат на страницу (и в консоль при необходимости)
    output.textContent = JSON.stringify(obj, null, 2);

    /* eslint-disable no-console */
    console.log('Form data:', obj);
    /* eslint-enable no-console */

    // Можно закрыть диалог или оставить открытым — оставим открытым и ресетим форму
    form.reset();

    // Скрываем элементы ошибок (вдруг были)
    nameError.setAttribute('hidden', '');
    emailError.setAttribute('hidden', '');
    passwordError.setAttribute('hidden', '');
  }

  form.addEventListener('submit', onFormSubmit);

  // --- Дополнительно: клавиша Escape закрывает dialog ---
  function onDialogKeyDown (event) {
    if (event.key === 'Escape') {
      dialog.close();
    }
  }
  dialog.addEventListener('keydown', onDialogKeyDown);

})();
