const TG_TOKEN = '8013834057:AAFgJAmnPutdMRe1p-EVEfvH4RUxlsfy_jM';
const CHAT_ID = '5415190532';

// ПРЕЛОАДЕР: Исчезает через 2 секунды после загрузки
window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.visibility = 'hidden', 1000);
    }, 2000);
});

const FOREST_DATA = {
    Flora: [
        { id: 1, title: "Giant Sequoias", short: "Ancient Wisdom", full: "Эти деревья — живые свидетели истории. Мы охраняем их покой и чистоту почвы вокруг.", icon: "fa-tree" },
        { id: 2, title: "Deep Mycelium", short: "The Web of Life", full: "Скрытая под землей сеть, которая позволяет лесу общаться и делиться энергией.", icon: "fa-mound" }
    ],
    Fauna: [
        { id: 3, title: "Amur Tiger", short: "The Silent King", full: "Мы используем спутниковые трекеры для защиты последних представителей этого вида.", icon: "fa-paw" },
        { id: 4, title: "Forest Owl", short: "Night Watch", full: "Совы — лучшие индикаторы экологического равновесия. Их присутствие — знак здоровья леса.", icon: "fa-dove" }
    ],
    Eco: [
        { id: 5, title: "Carbon Sink", short: "Natural Filter", full: "Наши леса поглощают тонны CO2, делая воздух пригодным для будущих поколений.", icon: "fa-wind" }
    ],
    Help: [
        { id: 6, title: "Guardian Squad", short: "Join the Rangers", full: "Станьте частью команды, которая патрулирует и защищает заповедные зоны.", icon: "fa-shield-heart" }
    ]
};

let currentPage = 'home';

// ПЕРЕКЛЮЧЕНИЕ ЧЕРЕЗ LOGO
function handleLogoClick() {
    if (currentPage === 'home') {
        navigateTo('menu');
    } else {
        navigateTo('home');
    }
}

function navigateTo(viewId) {
    const views = document.querySelectorAll('.view');
    const target = document.getElementById('view-' + viewId);

    views.forEach(v => {
        v.classList.add('hidden');
        v.classList.remove('active');
    });

    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    setTimeout(() => {
        target.classList.add('active');
        currentPage = viewId;
    }, 50);

    if (viewId === 'menu') changeCategory('Flora');
}

function changeCategory(cat) {
    document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + cat).classList.add('active');

    const grid = document.getElementById('catalog-grid');
    const data = FOREST_DATA[cat] || [];
    
    grid.innerHTML = data.map((item, idx) => `
        <div class="forest-card group" onclick="openDetail('${cat}', ${item.id})" style="animation: fadeInUp 0.5s ease forwards ${idx * 0.1}s; opacity: 0;">
            <i class="fa-solid ${item.icon} text-2xl text-green-900 mb-6 group-hover:text-green-500 transition"></i>
            <h4 class="text-xl font-serif italic mb-2">${item.title}</h4>
            <p class="text-[9px] text-green-950 font-black uppercase tracking-widest">${item.short}</p>
        </div>
    `).join('');
}

function openDetail(cat, id) {
    const item = FOREST_DATA[cat].find(x => x.id === id);
    const container = document.getElementById('detail-content');
    container.innerHTML = `
        <div class="min-h-screen pt-44 px-6 pb-20 max-w-4xl mx-auto">
            <button onclick="navigateTo('menu')" class="mb-10 text-[9px] font-black uppercase tracking-[3px] text-green-900 hover:text-white">← Return</button>
            <div class="bg-gradient-to-b from-[#030a03] to-black p-12 rounded-[40px] border border-white/5">
                <h2 class="text-5xl font-serif italic mb-6">${item.title}</h2>
                <p class="text-lg text-white/40 leading-relaxed mb-10">${item.full}</p>
                <button onclick="openModal()" class="py-4 px-8 bg-[#1a2e1a] rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-green-500 hover:text-black transition">Take Action</button>
            </div>
        </div>
    `;
    navigateTo('detail');
}

function openModal() { document.getElementById('modal-tg').classList.replace('hidden', 'flex'); }
function closeModal() { document.getElementById('modal-tg').classList.replace('flex', 'hidden'); }

async function sendMsg() {
    const name = document.getElementById('tg-name').value;
    const msg = document.getElementById('tg-msg').value;
    if(!name) return alert('Name required');
    try {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent('🌲 FOREST\nName: '+name+'\nMessage: '+msg)}`);
        alert('Information sent.');
        closeModal();
    } catch { alert('Error'); }
}

const style = document.createElement('style');
style.innerHTML = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
