/* ===== АВТОРИЗАЦИЯ ===== */
const auth = document.getElementById("auth");
const site = document.getElementById("site");
const userNameEl = document.getElementById("user-name");
let isRegister = false;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
  auth.style.display = "none";
  site.style.display = "block";
  userNameEl.textContent = currentUser.username;
} else {
  auth.style.display = "flex";
}

function switchToRegister() {
  isRegister = true;
  document.getElementById("auth-title").innerText = "Регистрация";
  document.getElementById("switch-text").innerHTML =
    'Уже есть аккаунт? <span onclick="switchToLogin()">Войти</span>';
}

function switchToLogin() {
  isRegister = false;
  document.getElementById("auth-title").innerText = "Вход";
  document.getElementById("switch-text").innerHTML =
    'Нет аккаунта? <span onclick="switchToRegister()">Зарегистрироваться</span>';
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) return alert("Заполните поля");

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (isRegister) {
    if (users[username]) return alert("Пользователь существует");
    users[username] = { password };
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    if (!users[username] || users[username].password !== password)
      return alert("Неверные данные");
  }

  localStorage.setItem("currentUser", JSON.stringify({ username }));
  location.reload();
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

/* ===== ФИЛЬМЫ ===== */
const movies = [
  { id: 1, title: "Запутанная любовь", year: 2025, description: "«Запутанная любовь» рассказывает историю двух молодых людей, чьи жизни неожиданно переплетаются. Герои сталкиваются с недопониманием, случайными встречами и сложными ситуациями, которые заставляют их пересмотреть свои чувства и решения. Фильм исследует тему дружбы, первой любви, романтических ошибок и того, как важно доверять своим эмоциям даже в самых запутанных обстоятельствах.", img: "https://vsedoramy.ru/uploads/mini/fullstory/9e/75f6bdf9c95b55668d2fc3564b915d.jpg", price: 599 },
  { id: 2, title: "Силачка До Бон Сун", year: 2016, description: "Это история молодой женщины До Бон Сун, обладающей невероятной физической силой. Она старается жить обычной жизнью, но её способности привлекают внимание окружающих и приводят к множеству комичных и трогательных ситуаций. Дорама исследует личностный рост, самоидентификацию, романтические отношения и дружбу, показывая, что сила может быть не только физической, но и эмоциональной.", img: "https://doramy.club/wp-content/uploads/2017/04/silachka-do-bon-sun.jpg", price: 399 },
  { id: 3, title: "Король Земли", year: 2023, description: "«Король земли» рассказывает о человеке, который сталкивается с трудностями и испытаниями в бизнесе и личной жизни. Сюжет показывает борьбу за власть, предательство, дружбу и любовь. Герои учатся делать правильный выбор и находить баланс между карьерой и сердечными делами. Дорама сочетает напряжённые драматические моменты с трогательными и романтическими сценами.", img: "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/2905ad64-7634-4839-b1dd-80e3549a9f0d/600x900", price: 799 },
  { id: 4, title: "Отель дель Луна", year: 2019, description: "Эта мистическая дорама рассказывает о необычном отеле, где живут души умерших. Главная героиня управляет этим местом с загадочностью и харизмой, а новый управляющий помогает ей справляться с тайнами прошлого. Сюжет сочетает романтику, драму и мистику, исследуя темы прощения, любви и самоопределения в мире между жизнью и смертью.", img: "https://kinogo.ec/uploads/posts/2020-11/1741941059-otel-del-luna.webp", price: 649 },
  { id: 5, title: "Потомки солнца", year: 2016, description: "Эта дорама рассказывает о солдате и докторе, чьи пути пересекаются во время миссии в зоне конфликта. Они сталкиваются с опасностями, моральными дилеммами и испытаниями чувств, учась доверять друг другу. Фильм исследует силу любви, жертвы и ответственности, а также важность человечности в сложных жизненных обстоятельствах.", img: "https://static.okko.tv/images/v4/7f73b384-b6ce-4ae8-afb7-89062d1e3aee?scale=1&quality=80", price: 549 },
  { id: 6, title: "Так я женился на антифанатке", year: 2024, description: "Это романтическая комедия о мужчине, который случайно оказывается связан браком с девушкой, которая раньше была его антифанаткой. Через смех, недоразумения и совместные приключения они начинают понимать друг друга глубже и постепенно открывают настоящие чувства. Дорама исследует темы любви, прощения, личностного роста и искренних эмоций.", img: "https://doramy.club/wp-content/uploads/2021/03/tak-ya-zhenilsya-na-antifanatke-2021.jpg", price: 449 },
  { id: 7, title: "Женись на мне", year: 2025, description: "История о девушке и парне, которые вынуждены притворяться супругами по разным причинам. Поначалу это вызывает конфликты и недопонимание, но со временем они узнают друг друга настоящими. Дорама сочетает комедийные моменты с романтикой, показывая, как совместное время и трудности помогают раскрыться чувствам.", img: "https://doramy.club/wp-content/uploads/2025/10/zhenis-na-mne1.jpg", price: 699 },
  { id: 8, title: "Саунтрек", year: 2022, description: "это романтическая дорама о музыке, любви и мечтах. Главные герои — талантливые музыканты, которые сталкиваются с трудностями на пути к успеху и одновременно ищут личное счастье. Через совместные выступления, конкурсы и творческие проекты они учатся понимать друг друга, преодолевать недопонимания и раскрывать свои настоящие чувства. Дорама сочетает яркие эмоциональные моменты, драму, романтику и вдохновение, показывая, как сила музыки может соединять сердца, изменять судьбы и помогать героям найти себя и любовь.", img: "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/6c5af888-3791-4112-994e-05eb1120f196/600x900", price: 499 },
  { id: 9, title: "Далли и дерзкий принц", year: 2021, description: "Это история о девушке, работающей в небольшой компании, и её начальнике, который обладает дерзким и харизматичным характером. Их отношения развиваются через множество комичных, романтических и напряжённых ситуаций. Дорама показывает путь от недопонимания к взаимному уважению и любви, а также важность смелости и честности в отношениях.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGj3GcTRHQ58l1_88FdO62Vkn-j81x5w2-dA&s", price: 529 },
  { id: 10, title: "Охотничьи псы", year: 2023, description: "Сюжет рассказывает о группе людей, вовлечённых в опасные приключения, расследования и борьбу с преступностью. Каждый герой имеет свои тайны, мотивации и прошлое, что делает сюжет напряжённым и драматичным. Дорама исследует темы справедливости, дружбы, предательства и отваги, показывая, как сложные ситуации раскрывают настоящую сущность человека.", img: "https://doramy.club/wp-content/uploads/2023/06/oxotnichi-psy.jpg", price: 749 },
  { id: 11, title: "Inception", year: 2010, description: "Домин и его команда экспертов проникают в сны людей, чтобы внедрять или извлекать идеи. Они сталкиваются с опасностями подсознания и лабиринтами разума, где границы между реальностью и сновидением стираются. Фильм исследует психологию, память и последствия манипуляции сознанием.", img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg", price: 399 },
  { id: 12, title: "Interstellar", year: 2014, description: "Группа исследователей отправляется через червоточину в поисках нового дома для человечества. Они сталкиваются с гравитационными аномалиями, временем и эмоциональными испытаниями, пытаясь спасти будущее Земли. Фильм сочетает научную фантастику с философскими размышлениями о любви и человеческой судьбе.", img: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg", price: 599 },
  { id: 13, title: "The Matrix", year: 1999, description: "Нео, обычный программист, обнаруживает, что мир вокруг него — компьютерная симуляция. Он присоединяется к группе повстанцев, чтобы бороться с могущественными машинами и освободить человечество. Фильм сочетает философию, боевые искусства и высокотехнологичную визуализацию виртуальной реальности.", img: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg", price: 449 },
  { id: 14, title: "Avengers: Endgame", year: 2019, description: "После катастрофических событий предыдущего фильма супергерои собираются, чтобы исправить последствия Таноса. Каждый из них сталкивается с личными потерями, испытаниями и необходимостью сотрудничества. Это эпическая история о дружбе, жертве и надежде на спасение мира.", img: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg", price: 899 },
  { id: 15, title: "The Dark Knight", year: 2008, description: "Бэтмен сталкивается с хаосом, который приносит Джокер, и вынужден пересмотреть свои методы борьбы с преступностью. Фильм исследует мораль, справедливость и границы героизма, показывая, что иногда выбор между добром и злом не так прост.", img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg", price: 499 },
  { id: 16, title: "Pulp Fiction", year: 1994, description: "Истории преступников, боксёров и убийц переплетаются в Нью-Йорке. Фильм известен своей нетрадиционной хронологией, диалогами и черным юмором. Он показывает повседневную жизнь и моральные дилеммы персонажей через призму криминальной культуры 90-х.", img: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg", price: 349 },
  { id: 17, title: "Fight Club", year: 1999, description: "Обычный офисный работник создает подпольный клуб боев, чтобы выплеснуть свою внутреннюю агрессию. Фильм исследует потребительство, кризис идентичности и психологические аспекты современного общества. Каждый бой становится метафорой поиска свободы и смысла.", img: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg", price: 429 },
  { id: 18, title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, description: "Фродо Бэггинс отправляется в опасное путешествие, чтобы уничтожить Кольцо Всевластья. Его сопровождают друзья, сталкивающиеся с магией, предательством и войной. Фильм исследует дружбу, смелость и жертву, показывая борьбу добра и зла в эпическом мире Средиземья.", img: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg", price: 799 },
  { id: 19, title: "Lonnely Runner", year: 2024, description: "«Хватай Сон Джэ и беги» — это захватывающая романтическая комедия о молодых людях, которые сталкиваются с непредсказуемыми ситуациями, когда любовь и дружба переплетаются с юмором и жизненными трудностями. Главный герой Сон Джэ — энергичный и немного наивный молодой человек, который постоянно попадает в смешные и иногда абсурдные ситуации. Он встречает девушку, которая полностью меняет его привычную жизнь, заставляя переосмыслить свои чувства и поступки. Дорама исследует тему искренних эмоций, самопознания и того, как важно не упустить момент и действовать решительно, когда сердце подсказывает путь. Зрители увлекаются динамичным сюжетом, смешными сценами и трогательными моментами, погружаясь в атмосферу теплых отношений, дружбы и личностного роста героев.", img: "https://avatars.mds.yandex.net/get-kinopoisk-image/10900341/a19d7044-05df-4900-95fb-5ba252ea8f16/600x900", price: 649 },
  { id: 20, title: "The Lion King", year: 1994, description: "Симба, молодой лев, должен принять наследие своего отца и восстановить порядок в королевстве. Фильм показывает дружбу, предательство и преодоление страха, а также важность ответственности и взросления. Яркая анимация и музыкальные номера делают историю незабываемой.", img: "https://upload.wikimedia.org/wikipedia/en/9/9d/Disney_The_Lion_King_2019.jpg", price: 899 }
];

const content = document.getElementById("content");
const cartKey = currentUser ? `movieCart_${currentUser.username}` : "movieCart";
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cart.reduce((s, i) => s + i.quantity, 0);
}

function addToCart(id) {
  const movie = movies.find(m => m.id === id);
  const item = cart.find(i => i.id === id);
  item ? item.quantity++ : cart.push({ ...movie, quantity: 1 });
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
  alert(`"${movie.title}" добавлен в корзину!`);
}

function showList() {
  content.innerHTML = "";
  movies.forEach(m => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${m.img}" alt="${m.title}">
      <div class="movie-info">
        <h3>${m.title}</h3>
        <p>Год: ${m.year}</p>
        <button onclick="event.stopPropagation(); addToCart(${m.id})">В корзину · ${m.price} ₽</button>
      </div>
    `;
    card.onclick = () => showDetail(m.id);
    content.appendChild(card);
  });
}

function showDetail(id) {
  const m = movies.find(x => x.id === id);
  content.innerHTML = `
    <div class="movie-detail">
      <h2>${m.title} (${m.year})</h2>
      <img src="${m.img}" alt="${m.title}">
      <p>${m.description}</p>
      <button onclick="addToCart(${m.id})" style="margin:20px 0;padding:12px 24px;background:#ffcc00;color:black;border:none;border-radius:12px;cursor:pointer;font-size:18px;font-weight:bold;">
        Купить просмотр · ${m.price} ₽
      </button>
      <div class="back-button" onclick="showList()">Назад к списку</div>
    </div>
  `;
}

function showBasket() {
  content.innerHTML = `
    <div class="basket-page">
      <h1 style="text-align:center;color:#ffcc00;margin-bottom:30px;">Моя корзина</h1>
      ${cart.length === 0 ? `<p style="text-align:center;font-size:20px;">Корзина пуста</p>
      <div style="text-align:center;margin:30px;">
        <button onclick="showList()" style="padding:12px 24px;background:#ffcc00;color:black;border:none;border-radius:12px;">Перейти к фильмам</button>
      </div>` : cart.map(item => `
        <div class="basket-item">
          <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/90x130/2c2c2c/666?text=Фильм'">
          <div class="basket-item-info">
            <h4>${item.title}</h4>
            <p>${item.year} год · ${item.price} ₽</p>
            <div class="quantity-controls">
              <button onclick="changeQuantity(${item.id}, -1)">–</button>
              <span style="font-size:18px;font-weight:bold;">${item.quantity}</span>
              <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
        </div>
      `).join("")}
      ${cart.length > 0 ? `<div class="total-price">Итого: ${cart.reduce((s,i)=>s+i.quantity*i.price,0)} ₽</div>
      <button class="checkout-btn" onclick="createOrder()">Оформить заказ</button>` : ""}
      <div style="text-align:center;margin-top:30px;">
        <div class="back-button" onclick="showList()">Вернуться к фильмам</div>
      </div>
    </div>
  `;
}

function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) removeFromCart(id);
    else {
      localStorage.setItem(cartKey, JSON.stringify(cart));
      updateCartCount();
      showBasket();
    }
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
  showBasket();
}

function createOrder() {
  const total = cart.reduce((s,i)=>s+i.quantity*i.price,0);
  alert(`Заказ оформлен!\n\n${cart.map(i=>`• ${i.title} ×${i.quantity}`).join("\n")}\n\nСумма: ${total} ₽\nСпасибо за покупку!`);
  cart = [];
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
  showList();
}

/* ===== ЗАПУСК ===== */
if (currentUser) {
  showList();
  updateCartCount();
}
