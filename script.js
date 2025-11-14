document.addEventListener('DOMContentLoaded', function() {
    
    // -----------------------------------------------------------------
    // A. 導覽列 RWD 漢堡選單切換 和 B. 平滑滾動功能 (維持不變)
    // -----------------------------------------------------------------
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.getElementById('nav-links-menu');
    const navHeight = 60; 

    if (navToggleBtn && navLinks) {
        navToggleBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth' 
                });
            }
        });
    });


    // -----------------------------------------------------------------
    // C. 圖片輪播功能 (Carousel) - 採用自動生成結構
    // -----------------------------------------------------------------
    function initCarousel() {
        const carousel = document.getElementById('leeseo-carousel');
        if (!carousel) return;

        // *** 圖片數據陣列：請確保這些檔案在 images 資料夾中且命名完全正確！ ***
        const imageFiles = [
            'highlight_lovedive.jpg',
            'leeseo_hero_bg.jpg',
            'leeseo_profile.jpg' // 可以隨意增加更多圖片
        ];

        let currentIndex = 0;
        const totalImages = imageFiles.length;
        if (totalImages === 0) return;

        // 1. 自動生成輪播的 HTML 結構
        let carouselHTML = `
            <div class="carousel-images" id="carousel-images">
                ${imageFiles.map(fileName => `<img src="images/${fileName}" alt="Leeseo畫廊照片" class="carousel-img">`).join('')}
            </div>
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
            <div class="carousel-dots" id="carousel-dots">
                ${imageFiles.map(() => `<span class="dot"></span>`).join('')}
            </div>
        `;
        carousel.innerHTML = carouselHTML; // 插入結構

        // 2. 取得新的 DOM 元素
        const carouselImages = document.getElementById('carousel-images');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const dots = carousel.querySelectorAll('.dot');
        
        // 3. 切換圖片函式
        function goToSlide(index) {
            if (index < 0) {
                currentIndex = totalImages - 1;
            } else if (index >= totalImages) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            const offset = -currentIndex * 100;
            carouselImages.style.transform = `translateX(${offset}%)`;

            // 更新導航點的 active 狀態
            updateDots();
        }

        // 4. 更新導航點狀態
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }
        
        // 5. 左右按鈕事件監聽
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        // 6. 導航點事件監聽
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // 7. 自動播放 (加分項)
        let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 4000); 

        // 8. 初始化：顯示第一張圖
        goToSlide(0);
        
        // 懸停時暫停自動播放
        carousel.addEventListener('mouseover', () => clearInterval(autoSlide));
        carousel.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => goToSlide(currentIndex + 1), 4000);
        });
    }

    // 啟動輪播
    initCarousel(); 
});