document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let time = 0;

    const particleCount = 60;
    const connectionDistance = 200;
    const mouseRadius = 250;
    let mouse = { x: -1000, y: -1000 };

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    // 水色系統のカラーパレット（灰色背景用）
    const blues = [
        { r: 0,   g: 190, b: 220 },  // Cyan
        { r: 50,  g: 200, b: 240 },  // Light cyan
        { r: 0,   g: 160, b: 200 },  // Deep cyan
        { r: 80,  g: 210, b: 245 },  // Bright sky
        { r: 30,  g: 180, b: 230 },  // Ocean cyan
        { r: 0,   g: 220, b: 255 },  // Vivid aqua
    ];

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.baseRadius = Math.random() * 2.5 + 1;
            this.color = blues[Math.floor(Math.random() * blues.length)];
            this.pulseOffset = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.02 + Math.random() * 0.02;
            // 一部のパーティクルは大きめの光る粒に
            this.isGlow = Math.random() < 0.15;
            if (this.isGlow) {
                this.baseRadius = Math.random() * 3 + 2.5;
            }
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // マウスとのインタラクション（ゆるく引き寄せ）
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius && dist > 0) {
                const force = (mouseRadius - dist) / mouseRadius * 0.008;
                this.vx += dx / dist * force;
                this.vy += dy / dist * force;
            }

            // 速度を制限
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 0.6) {
                this.vx = (this.vx / speed) * 0.6;
                this.vy = (this.vy / speed) * 0.6;
            }

            // 画面端でバウンス（ソフトに）
            if (this.x < 0) { this.x = 0; this.vx *= -1; }
            if (this.x > width) { this.x = width; this.vx *= -1; }
            if (this.y < 0) { this.y = 0; this.vy *= -1; }
            if (this.y > height) { this.y = height; this.vy *= -1; }
        }

        draw(time) {
            const pulse = 1 + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3;
            const r = this.baseRadius * pulse;
            const { r: cr, g: cg, b: cb } = this.color;

            if (this.isGlow) {
                // 大きな光る粒：放射グラデーション
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 6);
                gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.3)`);
                gradient.addColorStop(0.4, `rgba(${cr}, ${cg}, ${cb}, 0.08)`);
                gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
                ctx.fillStyle = gradient;
                ctx.fillRect(this.x - r * 6, this.y - r * 6, r * 12, r * 12);
            }

            // コアの粒
            ctx.beginPath();
            ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${this.isGlow ? 0.9 : 0.6})`;
            ctx.fill();
        }
    }

    // パーティクル間の接続線を描画
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.2;
                    const ci = particles[i].color;
                    const cj = particles[j].color;
                    // 両端の色を混ぜる
                    const mr = (ci.r + cj.r) / 2;
                    const mg = (ci.g + cj.g) / 2;
                    const mb = (ci.b + cj.b) / 2;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    // 背景：明るいホワイト〜淡いブルーのグラデーション
    function drawBackground(time) {
        const gradient = ctx.createRadialGradient(
            width * 0.5 + Math.sin(time * 0.001) * 100,
            height * 0.4 + Math.cos(time * 0.0015) * 60,
            0,
            width * 0.5,
            height * 0.5,
            Math.max(width, height) * 0.8
        );
        gradient.addColorStop(0, '#111111');
        gradient.addColorStop(0.5, '#0a0a0a');
        gradient.addColorStop(1, '#050505');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // ゆっくり動くアンビエントな光
        drawAmbientOrb(
            width * 0.25 + Math.sin(time * 0.0008) * 150,
            height * 0.35 + Math.cos(time * 0.001) * 80,
            400,
            'rgba(20, 30, 50, 0.15)'
        );
        drawAmbientOrb(
            width * 0.75 + Math.cos(time * 0.0012) * 120,
            height * 0.65 + Math.sin(time * 0.0009) * 100,
            350,
            'rgba(15, 25, 45, 0.12)'
        );
        drawAmbientOrb(
            width * 0.5 + Math.sin(time * 0.0006) * 200,
            height * 0.2 + Math.cos(time * 0.0007) * 50,
            300,
            'rgba(10, 20, 40, 0.10)'
        );
    }

    function drawAmbientOrb(x, y, radius, color) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    function setup() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function loop() {
        time++;
        ctx.clearRect(0, 0, width, height);

        drawBackground(time);
        drawConnections();

        particles.forEach(p => {
            p.update();
            p.draw(time);
        });

        requestAnimationFrame(loop);
    }

    // マウス追従
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    window.addEventListener('resize', setup);
    setup();
    loop();
});

// スクロール時にヘッダーの見た目を変える
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
