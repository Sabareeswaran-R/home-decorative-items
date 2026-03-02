// 1. SNOW EFFECT
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let snowflakes = [];
function initSnow() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    for(let i=0; i<100; i++) snowflakes.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*3+1, s: Math.random()*1+0.5 });
}
function drawSnow() {
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = "white";
    snowflakes.forEach(f => { ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI*2); ctx.fill(); f.y += f.s; if(f.y > canvas.height) f.y = -5; });
    requestAnimationFrame(drawSnow);
}
initSnow(); drawSnow();

// 2. 16 PRODUCTS DATA (L, B, H included)
const products = [
    { id: 1, name: "Geometric Cat", price: 1450, img: "images/1000101944.webp", details: { L: "18cm", B: "12cm", H: "28cm", origin: "India", color: "White/Gold", material: "Resin" } },
    { id: 2, name: "Sakura Bonsai", price: 1300, img: "images/1000101931.webp", details: { L: "22cm", B: "15cm", H: "20cm", origin: "Japan", color: "Pink", material: "Silk" } },
    { id: 3, name: "Swan Pair", price: 1950, img: "images/1000101925.jpg", details: { L: "25cm", B: "10cm", H: "22cm", origin: "Italy", color: "Blue", material: "Porcelain" } },
    { id: 4, name: "Golden Horse", price: 3200, img: "images/1000101929.png", details: { L: "32cm", B: "12cm", H: "38cm", origin: "India", color: "Gold", material: "Brass" } },
    { id: 5, name: "Giraffe Duo", price: 2400, img: "images/1000101932.jpg", details: { L: "15cm", B: "10cm", H: "45cm", origin: "Kenya", color: "White", material: "Polystone" } },
    { id: 6, name: "Lotus Stand", price: 890, img: "images/1000101952.jpg", details: { L: "28cm", B: "28cm", H: "22cm", origin: "India", color: "Gold", material: "Iron" } },
    { id: 7, name: "Sand Art Lamp", price: 4500, img: "images/1000101924.jpg", details: { L: "25cm", B: "25cm", H: "12cm", origin: "China", color: "Blue", material: "Glass/LED" } },
    { id: 8, name: "Floral Vase", price: 1100, img: "images/1000101927.jpg", details: { L: "16cm", B: "16cm", H: "32cm", origin: "France", color: "Floral", material: "Ceramic" } },
    { id: 9, name: "Elephant Bells", price: 1650, img: "images/1000101933.jpg", details: { L: "20cm", B: "12cm", H: "48cm", origin: "India", color: "Red", material: "Metal" } },
    { id: 10, name: "Gear Clock", price: 2800, img: "images/1000101946.jpg", details: { L: "15cm", B: "15cm", H: "30cm", origin: "Germany", color: "Gold", material: "Steel" } },
    { id: 11, name: "Fairy Dome", price: 2100, img: "images/1000101947.jpg", details: { L: "14cm", B: "14cm", H: "22cm", origin: "Vietnam", color: "Warm", material: "Glass" } },
    { id: 12, name: "Gold Buddha", price: 3500, img: "images/1000101926.jpg", details: { L: "30cm", B: "20cm", H: "40cm", origin: "India", color: "Gold", material: "Copper" } },
    { id: 13, name: "Stately Deer", price: 1800, img: "images/1000101930.jpg", details: { L: "22cm", B: "10cm", H: "35cm", origin: "India", color: "Black", material: "Resin" } },
    { id: 14, name: "Glass Tree", price: 1250, img: "images/1000101945.jpg", details: { L: "20cm", B: "20cm", H: "25cm", origin: "China", color: "Rainbow", material: "Glass" } },
    { id: 15, name: "Peacock Mural", price: 4200, img: "images/1000101983.jpg", details: { L: "60cm", B: "5cm", H: "90cm", origin: "India", color: "Blue", material: "Metal" } },
    { id: 16, name: "Ceramic Lotus", price: 950, img: "images/1000101954.jpg", details: { L: "18cm", B: "18cm", H: "40cm", origin: "India", color: "Green", material: "Ceramic" } }
];
let cart = [];

// 3. CORE FUNCTIONS (window prefix fixes Codepen errors)
window.checkLogin = function() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if(u === "admin" && p === "1234") {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
        renderItems();
    } else { alert("Try admin / 1234"); }
};

function renderItems() {
    document.getElementById('productGrid').innerHTML = products.map(p => `
        <div class="item">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="rainbow-btn" onclick="openDetails(${p.id})">View Details</button>
            <button class="rainbow-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

window.openDetails = function(id) {
    const p = products.find(x => x.id === id);
    const d = p.details;
    document.getElementById('modalData').innerHTML = `
        <img src="${p.img}" style="width:100%; border-radius:15px; border:2px solid #d4af37;">
        <h2 style="color:#d4af37; margin-top:10px;">${p.name}</h2>
        <div class="specs-box">
            <p><strong>📏 Length:</strong> ${d.L}</p>
            <p><strong>📐 Height:</strong> ${d.H}</p>
            <p><strong>↔️ Breadth:</strong> ${d.B}</p>
            <p><strong>🌍 Origin:</strong> ${d.origin}</p>
            <p><strong>🎨 Color:</strong> ${d.color}</p>
            <p><strong>💎 Material:</strong> ${d.material}</p>
        </div>
        <h3 style="font-size:1.6rem">Price: ₹${p.price}</h3>
        <button class="rainbow-btn" onclick="addToCart(${p.id}); closeModal();">Add to Cart</button>
    `;
    document.getElementById('detailModal').style.display = "block";
};

window.closeModal = function() { document.getElementById('detailModal').style.display = "none"; };

window.addToCart = function(id) {
    const p = products.find(x => x.id === id);
    cart.push(p);
    updateCartUI();
};

function updateCartUI() {
    document.getElementById('cartList').innerHTML = cart.map(i => `<p style="display:flex; justify-content:space-between;"><span>${i.name}</span> <span>₹${i.price}</span></p>`).join('');
    document.getElementById('totalPrice').innerText = cart.reduce((s, i) => s + i.price, 0);
}

window.placeOrder = function() {
    if(cart.length === 0) return alert("Cart empty!");
    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('orderSuccess').classList.remove('hidden');
    setTimeout(() => {
        cart = []; updateCartUI();
        document.getElementById('orderSuccess').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        window.scrollTo(0,0);
    }, 3000);
};


window.onclick = function(e) { if(e.target == document.getElementById('detailModal')) closeModal(); };
