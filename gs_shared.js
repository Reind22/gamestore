/* ═══════════════════════════════════════════
   GameStore — общий модуль (GS)
   Тема / язык / валюта / wishlist / toast / i18n
   Подключается на всех страницах после gs_data.js
   ═══════════════════════════════════════════ */

const GS = (() => {
  'use strict';

  const RATES = { USD: 1, RUB: 92.5, EUR: 0.92 };   // демо-курсы; в бою — API
  const SYM   = { USD: '$', RUB: '₽', EUR: '€' };
  const DEC   = { USD: 2, RUB: 0, EUR: 2 };

  const state = {
    theme: localStorage.getItem('gs-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    lang:  localStorage.getItem('gs-lang')  || 'ru',
    cur:   localStorage.getItem('gs-cur')   || 'USD',
    wish:  JSON.parse(localStorage.getItem('gs-wish') || '[]'),
    cart:  JSON.parse(localStorage.getItem('gs-cart') || '[]'),
  };

  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  /* ── helpers ── */
  const lang = () => state.lang;
  const money = usd => {
    const v = usd * RATES[state.cur];
    const d = DEC[state.cur];
    const n = v.toLocaleString(state.lang === 'ru' ? 'ru-RU' : 'en-US', {
      minimumFractionDigits: d, maximumFractionDigits: d
    });
    return state.cur === 'RUB' ? `${n} ${SYM.RUB}` : `${SYM[state.cur]}${n}`;
  };

  /* ── Тема ── */
  function applyTheme(){
    document.documentElement.dataset.theme = state.theme;
    $$('[data-set-theme]').forEach(b => b.classList.toggle('on', b.dataset.setTheme === state.theme));
  }

  /* ── Валюта ── */
  function applyCur(){
    $$('[data-usd]').forEach(el => { el.textContent = money(parseFloat(el.dataset.usd)); });
    $$('[data-set-cur]').forEach(b => b.classList.toggle('on', b.dataset.setCur === state.cur));
    $$('.dd[data-dd="cur"] .dd-label').forEach(l => { l.textContent = state.cur; });
    $$('.dd[data-dd="cur"] .cur-sym').forEach(l => { l.textContent = SYM[state.cur]; });
  }

  /* ── Язык ── */
  const RU = {
    brandSub:'ЭКСКЛЮЗИВНЫЕ АККАУНТЫ', navHome:'Главная', navCatalog:'Каталог', navHelp:'Помощь',
    searchPh:'Найти аккаунт, игру или ключ…', login:'Войти', filters:'Фильтры', reset:'Сбросить', menu:'Меню',
    fPlatform:'Платформа', fGenre:'Жанр', fPrice:'Цена', fType:'Тип аккаунта', fRegion:'Регион',
    gShooter:'Шутеры', gSim:'Симуляторы', gStrategy:'Стратегии', gRacing:'Гонки',
    tGames:'С играми', tEmpty:'Пустой', tSkins:'Со скинами', tRank:'С рангом',
    rRu:'Россия', rCis:'СНГ', rEu:'Европа', rOther:'Другое',
    found:'Найдено', items:'товара', of:'из', sortLabel:'Сортировка:',
    sortPopular:'По популярности', sortCheap:'Сначала дешёвые', sortExp:'Сначала дорогие',
    sortRating:'По рейтингу', sortNew:'По новизне', sortUpdated:'Недавно обновлённые',
    seeAll:'Смотреть все', viewMore:'Подробнее',
    shNew:'Новинки', shNewSub:'Только что добавили в магазин',
    shHot:'Популярное', shHotSub:'Покупают чаще всего',
    shUpdated:'Недавно обновлено', shUpdatedSub:'Обновили описание или цены',
    shAll:'Все товары', shAllSub:'Полный каталог с фильтрами',
    themeLight:'☀️ Светлая', themeDark:'🌙 Тёмная',
    curNote:'Все цены в USD. Другая валюта — для удобства просмотра.',
    showResults:'Показать результаты', ftAbout:'О магазине', ftWarranty:'Гарантии', ftPay:'Оплата', ftSupport:'Поддержка',
    wishAdd:'Добавлено в желаемое', wishDel:'Убрано из желаемого',
    toWish:'В желаемое', inWish:'В желаемом ★', similar:'Похожие товары',
    navWish:'Избранное', navCart:'Корзина', cartTtl:'Корзина', wishTtl:'Избранное',
    wishEmpty:'В избранном пусто', wishEmptySub:'Нажимайте на звёздочку у товаров, чтобы сохранить их здесь',
    cartEmpty:'Корзина пуста', cartEmptySub:'Добавьте товары из каталога — они появятся здесь',
    summary:'Итого', goodsCount:'Товаров', goodsSum:'Сумма',
    fee:'Комиссия платёжной системы', toPay:'К оплате', checkout:'Перейти к оплате',
    continue:'Продолжить покупки', payMore:'и другие',
    cartAddMsg2:'Добавлено в корзину',
    hitBadge:'Хит продаж',
    onlySale:'Только со скидкой', sortDiscBig:'Скидка: сначала больше', sortDiscSmall:'Скидка: сначала меньше', perPage:'Товаров на странице:', nothingFound:'Ничего не найдено',
    from:'От', to:'До',
    buyNow:'Купить сейчас', toCart:'Добавить в корзину', inCart:'В корзине',
    guarantee:'Гарантия 30 дней', delivery:'Мгновенная выдача',
    desc:'Описание', features:'Что вы получаете', media:'Медиа',
    back:'Назад в каталог', notFound:'Товар не найден',
    rating:'рейтинг', reviews:'отзывов', sold:'продано',
    empty:'Ничего не найдено', emptySub:'Попробуйте изменить фильтры',
    clearFilters:'Сбросить фильтры',
  };

  const RU_CACHE = {};
  const I18N = {
    en: {
      brandSub:'EXCLUSIVE ACCOUNTS', navHome:'Home', navCatalog:'Catalog', navHelp:'Help',
      searchPh:'Search accounts, games, keys…', login:'Sign in', filters:'Filters', reset:'Reset', menu:'Menu',
      fPlatform:'Platform', fGenre:'Genre', fPrice:'Price', fType:'Account type', fRegion:'Region',
      gShooter:'Shooters', gSim:'Simulators', gStrategy:'Strategy', gRacing:'Racing',
      tGames:'With games', tEmpty:'Empty', tSkins:'With skins', tRank:'With rank',
      rRu:'Russia', rCis:'CIS', rEu:'Europe', rOther:'Other',
      found:'Found', items:'items', of:'of', sortLabel:'Sort:',
      sortPopular:'Most popular', sortCheap:'Price: low to high', sortExp:'Price: high to low',
      sortRating:'Top rated', sortNew:'Newest', sortUpdated:'Recently updated',
      seeAll:'View all', viewMore:'View',
      shNew:'New arrivals', shNewSub:'Just added to the store',
      shHot:'Popular', shHotSub:'Most frequently purchased',
      shUpdated:'Recently updated', shUpdatedSub:'Description or prices updated',
      shAll:'All items', shAllSub:'Full catalog with filters',
      themeLight:'☀️ Light', themeDark:'🌙 Dark',
      curNote:'All prices are in USD. Other currencies are for convenience only.',
      showResults:'Show results', ftAbout:'About', ftWarranty:'Warranty', ftPay:'Payment', ftSupport:'Support',
      wishAdd:'Added to wishlist', wishDel:'Removed from wishlist',
      cartAddMsg:'Added to cart',
      hitBadge:'Bestseller',
      toWish:'Add to wishlist', inWish:'In wishlist ★', similar:'Similar items',
      navWish:'Wishlist', navCart:'Cart', cartTtl:'Cart', wishTtl:'Wishlist',
      wishEmpty:'Your wishlist is empty', wishEmptySub:'Tap the star on any item to save it here',
      cartEmpty:'Your cart is empty', cartEmptySub:'Add items from the catalog — they will appear here',
      summary:'Summary', goodsCount:'Items', goodsSum:'Subtotal',
      fee:'Payment processor fee', toPay:'Total', checkout:'Proceed to checkout',
      continue:'Continue shopping', payMore:'and more',
      cartAddMsg2:'Added to cart',
      from:'From', to:'To', priceUpTo:'Up to', priceRange:'More than',
      buyNow:'Buy now', toCart:'Add to cart', inCart:'In cart',
      guarantee:'30-day warranty', delivery:'Instant delivery',
      desc:'Description', features:'What you get', media:'Media',
      back:'Back to catalog', notFound:'Item not found',
      rating:'rating', reviews:'reviews', sold:'sold',
      empty:'Nothing found', emptySub:'Try changing filters',
      clearFilters:'Clear filters',
    },
    ru: {}
  };

  function L(key){
    if (state.lang === 'ru') return RU[key] || RU_CACHE[key] || key;
    return I18N.en[key] || RU[key] || RU_CACHE[key] || key;
  }

  function applyLang(){
    $$('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (state.lang === 'ru') { el.textContent = RU[k] || RU_CACHE[k] || el.textContent; return; }
      if (!RU_CACHE[k]) RU_CACHE[k] = el.textContent;
      if (I18N.en[k]) el.textContent = I18N.en[k];
    });
    $$('[data-i18n-ph]').forEach(el => {
      const k = el.dataset.i18nPh;
      if (state.lang === 'ru') { el.placeholder = RU[k] || RU_CACHE['ph_'+k] || el.placeholder; return; }
      if (!RU_CACHE['ph_'+k]) RU_CACHE['ph_'+k] = el.placeholder;
      if (I18N.en[k]) el.placeholder = I18N.en[k];
    });
    document.documentElement.lang = state.lang;
    $$('[data-set-lang]').forEach(b => b.classList.toggle('on', b.dataset.setLang === state.lang));
    applyCur();
  }

  /* ── Toast ── */
  let toastT;
  function toast(msg){
    let el = $('#toast'), msgEl = $('#toastMsg');
    if (!el){
      el = document.createElement('div');
      el.id = 'toast'; el.className = 'toast'; el.setAttribute('role','status');
      el.innerHTML = '<span class="s">★</span><span id="toastMsg"></span>';
      document.body.appendChild(el);
      msgEl = $('#toastMsg');
    }
    msgEl.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), 1900);
  }

  /* ── Wishlist ── */
  /* ── Cart ── */
  function cartAdd(id, qty = 1){
    const item = state.cart.find(c => c.id === id);
    if (item) item.qty += qty; else state.cart.push({ id, qty });
    localStorage.setItem('gs-cart', JSON.stringify(state.cart));
    updateCartPip();
  }
  function cartRemove(id){
    state.cart = state.cart.filter(c => c.id !== id);
    localStorage.setItem('gs-cart', JSON.stringify(state.cart));
    updateCartPip();
  }
  function cartSetQty(id, qty){
    const item = state.cart.find(c => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty);
    localStorage.setItem('gs-cart', JSON.stringify(state.cart));
    updateCartPip();
  }
  function updateCartPip(){
    const pip = $('#cartPip');
    if (!pip) return;
    const n = state.cart.reduce((s, c) => s + c.qty, 0);
    pip.textContent = n;
    pip.toggleAttribute('data-zero', !n);
  }
  function wishToggle(id, starEl){
    const i = state.wish.indexOf(id);
    const on = i === -1;
    if (on) state.wish.push(id); else state.wish.splice(i, 1);
    localStorage.setItem('gs-wish', JSON.stringify(state.wish));
    if (starEl){
      starEl.classList.toggle('on', on);
      starEl.textContent = on ? '★' : '☆';
    }
    updateWishPip();
    toast(L(on ? 'wishAdd' : 'wishDel'));
  }
  function updateWishPip(){
    const pip = $('#heartPip');
    if (!pip) return;
    pip.textContent = state.wish.length;
    pip.toggleAttribute('data-zero', !state.wish.length);
  }
  function wishBind(){
    // capture-phase: срабатывает ДО inline onclick карточек
    document.addEventListener('click', e => {
      const st = e.target.closest('.star');
      if (!st) return;
      e.preventDefault();
      e.stopPropagation();
      const holder = st.closest('[data-game-id]');
      const id = holder ? parseInt(holder.dataset.gameId) : null;
      if (id !== null) wishToggle(id, st);
    }, true);
    updateWishPip();
    // восстановить звёзды из localStorage
    $$('.star').forEach(st => {
      const holder = st.closest('[data-game-id]');
      if (holder && state.wish.includes(parseInt(holder.dataset.gameId))){
        st.classList.add('on');
        st.textContent = '★';
      }
    });
  }


  /* ── Dropdown для валюты и языка ── */
  const DD_CSS = `
    .dd{position:relative}
    .dd__btn{
      height:44px;padding:0 13px;border-radius:13px;
      border:1.5px solid var(--line-2);background:var(--paper);
      display:flex;align-items:center;gap:7px;
      font-size:13px;font-weight:800;color:var(--ink-2);
      transition:.18s;
    }
    .dd__btn:hover{border-color:var(--lime-deep);color:var(--ink)}
    .dd__btn .cur-sym{font-size:15px;color:var(--lime-deep)}
    .dd__btn .car{font-size:9px;color:var(--ink-3);transition:transform .22s}
    .dd.open .dd__btn .car{transform:rotate(-180deg)}
    .dd__pop{
      position:absolute;top:calc(100% + 8px);right:0;z-index:120;
      min-width:150px;padding:6px;
      background:var(--paper);border:1px solid var(--line);border-radius:14px;
      box-shadow:var(--sh-2);
      opacity:0;pointer-events:none;transform:translateY(-6px);
      transition:.18s var(--ease);
    }
    .dd.open .dd__pop{opacity:1;pointer-events:auto;transform:none}
    .dd__it{
      width:100%;text-align:left;
      display:flex;align-items:center;justify-content:space-between;gap:10px;
      padding:9.5px 12px;border-radius:9px;
      font-size:13px;font-weight:700;color:var(--ink-2);
      transition:.12s;
    }
    .dd__it:hover{background:var(--hover-wash);color:var(--ink)}
    .dd__it.on{color:var(--lime-deep);font-weight:800}
    .dd__it .tick{opacity:0;color:var(--lime-deep)}
    .dd__it.on .tick{opacity:1}
  `;

  function buildDropdowns(){
    // CSS один раз
    if (!document.getElementById('dd-css')){
      const s = document.createElement('style');
      s.id = 'dd-css';
      s.textContent = DD_CSS;
      document.head.appendChild(s);
    }
    // Валюта
    $$('[data-dd="cur"]').forEach(box => {
      box.innerHTML = `
        <button class="dd__btn" aria-haspopup="listbox" aria-expanded="false">
          <span class="cur-sym">${SYM[state.cur]}</span>
          <span class="dd-label">${state.cur}</span>
          <span class="car">▼</span>
        </button>
        <div class="dd__pop" role="listbox">
          ${Object.keys(RATES).map(c => `
            <button class="dd__it ${c === state.cur ? 'on' : ''}" data-cur="${c}">
              <span>${c === 'USD' ? '$ USD' : c === 'RUB' ? '₽ RUB' : '€ EUR'}</span>
              <span class="tick">✓</span>
            </button>`).join('')}
        </div>`;
      bindDD(box, 'cur');
    });
    // Язык
    $$('[data-dd="lang"]').forEach(box => {
      box.innerHTML = `
        <button class="dd__btn" aria-haspopup="listbox" aria-expanded="false">
          <span class="dd-label">${state.lang.toUpperCase()}</span>
          <span class="car">▼</span>
        </button>
        <div class="dd__pop" role="listbox">
          <button class="dd__it ${state.lang === 'ru' ? 'on' : ''}" data-lang="ru"><span>🇷🇺 Русский</span><span class="tick">✓</span></button>
          <button class="dd__it ${state.lang === 'en' ? 'on' : ''}" data-lang="en"><span>🇬🇧 English</span><span class="tick">✓</span></button>
        </div>`;
      bindDD(box, 'lang');
    });
  }
  function bindDD(box, kind){
    const btn = box.querySelector('.dd__btn');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      // закрыть другие
      $$('.dd.open').forEach(d => { if (d !== box) d.classList.remove('open'); });
      box.classList.toggle('open');
      btn.setAttribute('aria-expanded', box.classList.contains('open'));
    });
    box.querySelectorAll('.dd__it').forEach(it => it.addEventListener('click', () => {
      box.classList.remove('open');
      if (kind === 'cur'){
        state.cur = it.dataset.cur;
        localStorage.setItem('gs-cur', state.cur);
        applyCur();
        buildDropdowns(); // обновить лейбл
        toast(state.lang === 'ru'
          ? `Цены показаны в ${state.cur}. Расчёт и оплата — в USD.`
          : `Prices shown in ${state.cur}. Billing is in USD.`);
        document.dispatchEvent(new CustomEvent('gs-cur-changed'));
      } else {
        state.lang = it.dataset.lang;
        localStorage.setItem('gs-lang', state.lang);
        location.reload();
      }
    }));
    document.addEventListener('click', e => {
      if (!box.contains(e.target)) box.classList.remove('open');
    });
  }


  /* ── Чат-виджет: кружок → ТГ + окно чата ── */
  function buildChat(){
    if (document.getElementById('gs-chat')) return;
    const TG_LINK = 'https://t.me/gamestore_support_bot'; // ← заменить на своего бота
    const wrap = document.createElement('div');
    wrap.id = 'gs-chat';
    wrap.innerHTML = `
    <style>
      #gs-chat{position:fixed;right:20px;bottom:20px;z-index:500}
      #gs-chat .fab{
        width:56px;height:56px;border-radius:50%;
        background:linear-gradient(140deg,#5CFF5C,var(--lime) 45%,#00D400);
        color:var(--lime-ink);
        display:grid;place-items:center;
        box-shadow:0 8px 24px rgba(0,220,60,.45), inset 0 1px 0 rgba(255,255,255,.5);
        cursor:pointer;border:none;
        transition:transform .2s var(--ease), box-shadow .2s;
      }
      #gs-chat .fab:hover{transform:scale(1.08)}
      #gs-chat .fab svg{width:26px;height:26px}
      #gs-chat .fab .x{display:none}
      #gs-chat.open .fab .bubble{display:none}
      #gs-chat.open .fab .x{display:block}
      #gs-chat .tg{
        position:absolute;right:8px;bottom:70px;
        width:46px;height:46px;border-radius:50%;
        background:var(--paper);color:#229ED9;
        display:grid;place-items:center;
        box-shadow:var(--sh-2, 0 8px 24px rgba(0,0,0,.2));
        border:1.5px solid var(--line-2,#D8DDD8);
        opacity:0;pointer-events:none;transform:translateY(10px) scale(.7);
        transition:.25s var(--ease);
      }
      #gs-chat.open .tg{opacity:1;pointer-events:auto;transform:none}
      #gs-chat .tg:hover{transform:scale(1.1)}
      #gs-chat .tg svg{width:23px;height:23px}
      #gs-chat .win{
        position:absolute;right:0;bottom:70px;
        width:min(320px, calc(100vw - 40px));height:400px;
        background:var(--paper,#fff);border:1px solid var(--line,#E4E7E4);
        border-radius:18px;box-shadow:0 18px 48px rgba(0,0,0,.22);
        display:flex;flex-direction:column;overflow:hidden;
        opacity:0;pointer-events:none;transform:translateY(14px) scale(.96);
        transform-origin:bottom right;
        transition:.25s var(--ease);
      }
      #gs-chat.open .win{opacity:1;pointer-events:auto;transform:none}
      #gs-chat .win__head{
        padding:14px 16px;
        background:linear-gradient(140deg,#5CFF5C,var(--lime) 45%,#00D400);
        color:var(--lime-ink,#053B05);
        display:flex;align-items:center;gap:10px;
      }
      #gs-chat .win__head .av{width:34px;height:34px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:17px}
      #gs-chat .win__head b{font-size:14px;font-weight:800;display:block}
      #gs-chat .win__head small{font-size:10.5px;font-weight:700;opacity:.75;display:flex;align-items:center;gap:5px}
      #gs-chat .win__head small::before{content:'';width:7px;height:7px;border-radius:50%;background:#0A7A0A;display:inline-block}
      #gs-chat .win__body{
        flex:1;overflow-y:auto;padding:14px;
        display:flex;flex-direction:column;gap:9px;
        background:var(--bg,#F0F0F0);
      }
      #gs-chat .msg{max-width:82%;padding:9px 13px;border-radius:13px;font-size:12.5px;font-weight:600;line-height:1.5}
      #gs-chat .msg.bot{background:var(--paper,#fff);color:var(--ink,#171B17);border:1px solid var(--line,#E4E7E4);align-self:flex-start;border-bottom-left-radius:4px}
      #gs-chat .msg.me{background:var(--lime-deep,#0ECC0E);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
      #gs-chat .win__input{
        display:flex;gap:8px;padding:10px;border-top:1px solid var(--line,#E4E7E4);
        background:var(--paper,#fff);
      }
      #gs-chat .win__input input{
        flex:1;height:38px;padding:0 13px;border:1.5px solid var(--line-2,#D8DDD8);
        border-radius:10px;font:inherit;font-size:12.5px;font-weight:600;
        background:var(--bg,#F0F0F0);color:var(--ink,#171B17);outline:none;
      }
      #gs-chat .win__input input:focus{border-color:var(--lime-deep)}
      #gs-chat .win__input button{
        width:38px;height:38px;border-radius:10px;
        background:var(--lime-deep,#0ECC0E);color:#fff;
        display:grid;place-items:center;flex-shrink:0;
      }
      #gs-chat .win__input button svg{width:16px;height:16px}
    </style>
    <button class="fab" aria-label="Чат поддержки">
      <svg class="bubble" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.6 0-3.1-.4-4.4-1.2L3 20l1.2-4.1A8.5 8.5 0 1 1 21 11.5z"/></svg>
      <svg class="x" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <a class="tg" href="${TG_LINK}" target="_blank" rel="noopener" aria-label="Telegram-бот" title="Telegram-бот">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.7 3.3 2.9 10.6c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8 1 .8.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.6.2 1.8-.9l3.2-15.2c.3-1.3-.5-1.9-1.9-1.4zM7.9 13.3l10.4-6.6c.5-.3 1-.1.6.2l-8.9 8-.4 3.4-1.7-5z"/></svg>
    </a>
    <div class="win">
      <div class="win__head">
        <span class="av">🎧</span>
        <div><b>Поддержка GameStore</b><small>онлайн · отвечаем ~15 минут</small></div>
      </div>
      <div class="win__body" id="gs-chat-body">
        <div class="msg bot">Привет! Это поддержка GameStore. Опишите вопрос — ответим в течение 15 минут. Для быстрой связи круглосуточно — жмите иконку Telegram выше.</div>
      </div>
      <div class="win__input">
        <input type="text" placeholder="Ваше сообщение…" aria-label="Сообщение">
        <button aria-label="Отправить">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>
        </button>
      </div>
    </div>`;

    document.body.appendChild(wrap);
    const fab = wrap.querySelector('.fab');
    fab.addEventListener('click', () => {
      // closed → stage1 (только TG) → open (окно чата) → closed
      if (wrap.classList.contains('open')){
        wrap.classList.remove('open'); wrap.classList.remove('stage1');
      } else if (wrap.classList.contains('stage1')){
        wrap.classList.remove('stage1'); wrap.classList.add('open');
      } else {
        wrap.classList.add('stage1');
      }
    });

    const input = wrap.querySelector('input');
    const body = wrap.querySelector('#gs-chat-body');
    const send = () => {
      const v = input.value.trim();
      if (!v) return;
      body.insertAdjacentHTML('beforeend', `<div class="msg me"></div>`);
      body.lastElementChild.textContent = v;
      input.value = '';
      body.scrollTop = body.scrollHeight;
      setTimeout(() => {
        body.insertAdjacentHTML('beforeend', '<div class="msg bot">Сообщение received! Оператор подключится в течение 15 минут. Быстрее — в Telegram-боте 👆</div>');
        body.scrollTop = body.scrollHeight;
      }, 900);
    };
    wrap.querySelector('.win__input button').addEventListener('click', send);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
  }


  /* ── Прогресс-линия загрузки под шапкой ── */
  function buildLoadBar(){
    if (document.getElementById('gs-loadbar-style')) return;
    const st = document.createElement('style');
    st.id = 'gs-loadbar-style';
    st.textContent = `
      @keyframes gs-loadbar{0%{left:-35%}45%{left:35%}100%{left:105%}}
      .hdr::after{transition:none}
      body.gs-loading .hdr::after{
        opacity:.95 !important;
        background:linear-gradient(90deg, transparent, var(--lime) 50%, transparent) !important;
      }
      body.gs-loading .hdr::after{ animation: gs-loadbar 1.1s ease-in-out infinite; }
    `;
    document.head.appendChild(st);
    document.body.classList.add('gs-loading');
    window.addEventListener('load', () => {
      document.body.classList.remove('gs-loading');
    });
    // страховка: если load не сработал за 4с — снять
    setTimeout(() => document.body.classList.remove('gs-loading'), 4000);
  }

  /* ── Инициализация общих обработчиков ── */
  function init(){
    applyTheme();
    applyLang();
    wishBind();
    buildDropdowns();
    updateCartPip();
    buildChat();
    buildLoadBar();

    $$('[data-set-theme]').forEach(b => b.addEventListener('click', () => {
      state.theme = b.dataset.setTheme;
      localStorage.setItem('gs-theme', state.theme);
      applyTheme();
    }));
    $$('[data-set-lang]').forEach(b => b.addEventListener('click', () => {
      state.lang = b.dataset.setLang;
      localStorage.setItem('gs-lang', state.lang);
      // перезагрузка: динамический контент (полки, каталог, карточки) перерендерится на новом языке
      location.reload();
    }));
    $$('[data-set-cur]').forEach(b => b.addEventListener('click', () => {
      state.cur = b.dataset.setCur;
      localStorage.setItem('gs-cur', state.cur);
      applyCur();
      toast(state.lang === 'ru'
        ? `Цены показаны в ${state.cur}. Расчёт и оплата — в USD.`
        : `Prices shown in ${state.cur}. Billing is in USD.`);
    }));

    /* Ctrl+K */
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
        e.preventDefault();
        $('.find input')?.focus();
      }
    });

    /* Мобильное меню */
    const burger = $('#burger');
    if (burger){
      const sheet = $('#sheet'), veil = $('#veil');
      const open = () => {
        sheet.classList.add('open'); veil.classList.add('open');
        sheet.setAttribute('aria-hidden','false');
        burger.setAttribute('aria-expanded','true');
        document.body.style.overflow = 'hidden';
      };
      const close = () => {
        sheet.classList.remove('open'); veil.classList.remove('open');
        sheet.setAttribute('aria-hidden','true');
        burger.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
      };
      burger.addEventListener('click', open);
      $('#sheetX')?.addEventListener('click', close);
      veil.addEventListener('click', close);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }
  }

  /* Автозапуск при DOM-ready */
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { $, $$, lang, L, money, fmt: money, toast, wishToggle, wishBind, cartAdd, cartRemove, cartSetQty, updateCartPip, state };
})();
