// ----------------------
// Вспомогательные DOM элементы
// ----------------------
const btnJob = document.getElementById('btn-job');
const jobOutput = document.getElementById('job-output');

const btnGetData = document.getElementById('btn-getdata');
const probInput = document.getElementById('probability');
const payloadInput = document.getElementById('payload');
const numArgInput = document.getElementById('numArg');
const getDataOutput = document.getElementById('getdata-output');

const inventoryListEl = document.getElementById('inventory-list');
const btnCraftLeaf = document.getElementById('btn-craft-leaf');
const btnCraftBase = document.getElementById('btn-craft-base');
const btnCraftMasala = document.getElementById('btn-craft-masala');
const craftLogOutput = document.getElementById('craft-log-output');

// ----------------------
// ЗАДАНИЕ 1: Resolve
// ----------------------

function job() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('чай заварен!');
    }, 2000);
  });
}

function onBtnJobClick() {
  jobOutput.textContent = 'Ждём заваривания...';

  job().then(function (result) {
    jobOutput.textContent = result;
  });
}

btnJob.addEventListener('click', onBtnJobClick);

// ----------------------
// ЗАДАНИЕ 2: getData (замыкание)
// ----------------------

function getData(probability, str) {
  const prob = typeof probability === 'number' ? probability : 0.5;
  const baseString = 'Чайные данные: ' + (String(str) || '');

  return function returnedFn(num) {
    if (typeof num !== 'number' || Number.isNaN(num)) {
      return null;
    }

    if (Math.random() < prob) {
      return baseString;
    }
    return null;
  };
}

function onBtnGetDataClick() {
  const p = parseFloat(probInput.value);
  const payload = payloadInput.value;
  const numArg = Number(numArgInput.value);

  const getter = getData(p, payload);
  const result = getter(numArg);

  if (result === null) {
    getDataOutput.textContent = 'null (ошибка или вероятность не сработала)';
  } else {
    getDataOutput.textContent = result;
  }
}

btnGetData.addEventListener('click', onBtnGetDataClick);

// ----------------------
// ЗАДАНИЕ 3: Система «чайного крафта»
// ----------------------

const inventory = {
  leaf: 2,   // листовой чай
  spice: 1,  // специи
  water: 2   // вода
};

// описание предметов
const items = {
  leaf: {
    key: 'leaf',
    name: 'Чайный лист',
    craftingTime: 1000,
    requiredItems: [],
    failProbability: 0
  },
  teaBase: {
    key: 'teaBase',
    name: 'Чайная основа',
    craftingTime: 1500,
    requiredItems: ['leaf', 'water'],
    failProbability: 0.15
  },
  masalaTea: {
    key: 'masalaTea',
    name: 'Масала-чай',
    craftingTime: 2500,
    requiredItems: ['teaBase', 'spice'],
    failProbability: 0.2
  }
};

// логирование
function appendLog(message, type) {
  const time = new Date().toLocaleTimeString();
  const tag = type === 'ok' ? '[OK]' : type === 'fail' ? '[FAIL]' : '[..]';
  craftLogOutput.textContent += time + ' ' + tag + ' ' + message + '\n';
  craftLogOutput.scrollTop = craftLogOutput.scrollHeight;
}

// рендер инвентаря
function renderInventory() {
  inventoryListEl.innerHTML = '';
  const keys = ['leaf', 'spice', 'water', 'teaBase', 'masalaTea'];

  for (const k of keys) {
    const li = document.createElement('li');
    const qty = inventory[k] || 0;
    li.textContent = items[k] ? items[k].name : k;

    const span = document.createElement('span');
    span.textContent = qty;
    li.appendChild(span);

    inventoryListEl.appendChild(li);
  }
}

// процесс приготовления
function craft(itemKey) {
  const item = items[itemKey];

  return new Promise(function (resolve, reject) {
    // проверяем ресурсы
    for (const req of item.requiredItems) {
      if (!inventory[req] || inventory[req] <= 0) {
        reject(new Error('Нехватает: ' + req));
        return;
      }
    }

    // тратим ингредиенты
    for (const req of item.requiredItems) {
      inventory[req] -= 1;
    }
    renderInventory();

    appendLog('Начато приготовление: ' + item.name + ' (' + item.craftingTime + ' мс)');

    setTimeout(function () {
      const fail = Math.random() < item.failProbability;

      if (fail) {
        appendLog('Не удалось приготовить: ' + item.name, 'fail');
        reject(new Error('Ошибка при готовке: ' + item.name));
        return;
      }

      inventory[itemKey] = (inventory[itemKey] || 0) + 1;
      renderInventory();
      appendLog('Успешно приготовлено: ' + item.name, 'ok');

      resolve(item);
    }, item.craftingTime);
  });
}

// создание с зависимостями
function createWithDependencies(itemKey) {
  const item = items[itemKey];

  if (item.requiredItems.length === 0) {
    return craft(itemKey);
  }

  const promises = item.requiredItems.map(req => {
    if (inventory[req] > 0) {
      appendLog('Ингредиент есть: ' + req);
      return Promise.resolve(req);
    }

    if (!items[req]) {
      return Promise.reject(new Error('Нет рецепта: ' + req));
    }

    return craft(req);
  });

  return Promise.allSettled(promises).then(results => {
    let failed = false;

    results.forEach(r => {
      if (r.status === 'rejected') {
        appendLog('Не получилось приготовить зависимость: ' + r.reason, 'fail');
        failed = true;
      } else {
        appendLog('Ингредиент готов: ' + (r.value.name || r.value), 'ok');
      }
    });

    if (failed) {
      return Promise.reject(new Error('Не все ингредиенты готовы'));
    }

    return craft(itemKey);
  });
}

// обработчики кнопок
btnCraftLeaf.addEventListener('click', () => {
  craft('leaf')
    .catch(err => appendLog(err.message, 'fail'));
});

btnCraftBase.addEventListener('click', () => {
  createWithDependencies('teaBase')
    .catch(err => appendLog(err.message, 'fail'));
});

btnCraftMasala.addEventListener('click', () => {
  createWithDependencies('masalaTea')
    .catch(err => appendLog(err.message, 'fail'));
});

// стартовый рендер
renderInventory();
