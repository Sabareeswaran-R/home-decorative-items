:root {
    --rose: #ff66b2; --gold: #d4af37; --silver: #c0c0c0; --blue: #87ceeb; --green: #4caf50;
}

body {
    margin: 0; font-family: 'Segoe UI', sans-serif; color: white;
    background: linear-gradient(-45deg, var(--rose), var(--gold), var(--silver), var(--blue), var(--green));
    background-size: 400% 400%; animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG { 0% {background-position:0% 50%} 50% {background-position:100% 50%} 100% {background-position:0% 50%} }

#snowCanvas { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 1; }
.hidden { display: none !important; }

.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 25px; padding: 40px; position: relative; z-index: 5; }

.item { background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); padding: 15px; border-radius: 20px; text-align: center; border: 1px solid rgba(255,255,255,0.1); transition: 0.3s; }
.item:hover { transform: translateY(-10px); border-color: var(--gold); }
.item img { width: 100%; height: 220px; object-fit: cover; border-radius: 15px; }

.rainbow-btn {
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8);
    background-size: 400%; color: white; border: none; padding: 12px; border-radius: 25px; cursor: pointer; width: 100%; margin-top: 10px; font-weight: bold;
}
.rainbow-btn:hover { animation: rainbowMove 2s linear infinite; }
@keyframes rainbowMove { 0% {background-position:0% 50%} 100% {background-position:100% 50%} }

.overlay, .success-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 2000; }
.login-card, .cart-container, .modal-content { background: #111; padding: 30px; border-radius: 25px; border: 1px solid var(--gold); text-align: center; max-width: 450px; width: 90%; }

.input-group input { display: block; width: 90%; margin: 10px auto; padding: 12px; border-radius: 8px; border: none; }

.modal { display: none; position: fixed; z-index: 3000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); overflow-y: auto; }
.close { float: right; font-size: 30px; cursor: pointer; color: white; }

/* Specs Style */
.specs-box p { margin: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; text-align: left; }