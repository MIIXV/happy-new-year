// 在文件开头添加计数器
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const messageEl = document.getElementById('message');
let messageIndex = 0;  // 添加消息索引计数器

// 设置画布尺寸
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// 祝福语列表
const messages = [
    "猫猫新年快乐~",
    "健康平安",
    "有你的每一天都是最好的节日",
    "所求皆如愿",
    "所愿皆所得",
    "所行化坦途",
    "长命千岁",
    "万事皆可期",
    "喜乐安宁"
];

// 烟花粒子类
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        // 降低衰减速度，使烟花持续更久
        this.decay = Math.random() * 0.007 + 0.007;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
    }

    update() {
        this.velocity.y += 0.1;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
        this.draw();
    }
}

let particles = [];

// 创建烟花
function createFirework(x, y) {
    const colors = [
        '255, 182, 193',    // 粉红
        '255, 215, 0',      // 金色
        '135, 206, 235',    // 天蓝
        '255, 192, 203',    // 粉色
        '255, 69, 0'        // 红橙
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// 动画循环
function animate() {
    ctx.fillStyle = 'rgba(26, 26, 26, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(particle => {
        particle.update();
        return particle.alpha > 0;
    });

    if (particles.length === 0 && messageEl.style.opacity === '1') {
        messageEl.style.opacity = '0';
    }

    requestAnimationFrame(animate);
}

// 修改消息样式，使其跟随鼠标位置
// 修改 showMessage 函数
function showMessage(x, y) {
    messageEl.style.top = y + 'px';
    messageEl.style.left = x + 'px';
    messageEl.textContent = messages[messageIndex];  // 使用计数器替代随机索引
    messageEl.style.opacity = '1';
    
    // 更新消息索引，循环显示
    messageIndex = (messageIndex + 1) % messages.length;
    
    setTimeout(() => {
        messageEl.style.opacity = '0';
    }, 5000);
}

// 创建彩色烟花
function createFirework(x, y) {
    for (let i = 0; i < 100; i++) {
        // 为每个粒子生成随机颜色
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const color = `${r}, ${g}, ${b}`;
        particles.push(new Particle(x, y, color));
    }
}

// 点击事件处理
canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
    
    // 缩短等待时间到0.5秒
    setTimeout(() => {
        showMessage(e.clientX, e.clientY);
    }, 500);
});

animate();