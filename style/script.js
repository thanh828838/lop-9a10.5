document.addEventListener('DOMContentLoaded', () => {
    const gatekeeper = document.getElementById('gatekeeper');
    const gateBtns = document.querySelectorAll('.gate-btn');
    const gateAlert = document.getElementById('gateAlert');
    const alertGif = document.getElementById('alertGif');
    const alertMsg = document.getElementById('alertMsg');

    const correctGif = "https://i.pinimg.com/originals/b7/c6/4a/b7c64aca651271c52087f58276bd1de1.gif";
    const wrongGif = "https://i.pinimg.com/originals/59/4f/99/594f995748f0463a8c61c1c593510815.gif";
    
    // SFX for verification
    const correctSfx = new Audio('style/question/correct.mp3');
    const wrongSfx = new Audio('style/question/wrong.mp3');

    if (gatekeeper && gateAlert) {
        gateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const answer = btn.getAttribute('data-answer');
                const card = gatekeeper.querySelector('.gate-card');
                
                if (answer === 'D') {
                    btn.classList.add('correct');
                    if (card) card.classList.add('blur-all');
                    if (alertGif) alertGif.src = correctGif;
                    alertMsg.innerText = "Chào mừng trở lại!";
                    gateAlert.className = "gate-alert success show";
                    
                    // SFX and Music Start
                    correctSfx.play();
                    playSongAtIndex(0); // Start the first song in bgMusic
                    
                    setTimeout(() => {
                        gatekeeper.classList.add('fade-out');
                        document.body.style.overflow = 'auto'; 
                        setTimeout(() => gatekeeper.remove(), 1000);
                    }, 1800);
                } else {
                    btn.classList.add('wrong');
                    if (card) card.classList.add('blur-all');
                    if (alertGif) alertGif.src = wrongGif;
                    alertMsg.innerText = "Mày Là Ai?!?!?!?!?!?!";
                    gateAlert.className = "gate-alert error show";
                    
                    // Play Wrong SFX
                    wrongSfx.play();
                    
                    setTimeout(() => {
                        gateAlert.classList.remove('show');
                        btn.classList.remove('wrong');
                        if (card) card.classList.remove('blur-all');
                    }, 2000);
                }
            });
        });
    }
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); 
    });

    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });

    const memberGrid = document.getElementById('memberGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    const members = [
        { name: 'Phước Thành', nickname: 'Mập', quote:'code đến già', img: 'style/img/ThanhVien/PhuocThanh.jpg', hobbies: 'Chụp ảnh, code', message: 'hẹn gặp lại sau này!' },
        { name: 'Khánh Nam', nickname: 'Vua Bright', quote:'Vua đến rồi', img: 'style/img/ThanhVien/KhanhNam.jpg', hobbies: 'Đá Banh, Em', message: 'Vua bright cũng không sáng bằng những ngày tháng cuối cấp này'},
        { name: 'Tường Quan', nickname: 'Thằng Tày', quote:'Bamboo', img: 'style/img/ThanhVien/Bambo.jpg', hobbies: 'Cristiano Ronaldo, Hotwheels', message: 'Tôi sẽ nhớ anh em lắm!'},
        { name: 'Ngọc Hân', nickname: 'Thắng Riêu', quote:'bây ơi', img: 'syle/img/ThanhVien/Ngochan.jpg', hobbies: 'đồ ngọt, tiền', message: 'sau này ph sống tốt, có gì đừng im lặng, mọi chuyện còn t lo. Không hứa, chỉ dặn vậy thôi. Đừng buồn, ph luôn hạnh phúc, xa nhau r k còn ai kén ăn cho acu gank nữa đâu. Tui thương acu lắm'},
    ];
    
    let currentIndex = 0;
    let isShowingAll = false;

    function getInitialItemsCount() {
        return window.innerWidth <= 768 ? 3 : 6;
    }

    function createMemberCard(m) {
        const card = document.createElement('div');
        card.className = 'member-card animate-up';
        card.innerHTML = `
            <div class="member-img-wrapper">
                <img src="${m.img}" alt="${m.name}" loading="lazy">
                <div class="member-overlay">
                    <p class="quote">"${m.quote}"</p>
                    <div class="view-more">Xem chi tiết <i class="fas fa-arrow-right"></i></div>
                </div>
            </div>
            <div class="member-info">
                <div class="name-container">
                    <h3 class="member-name">${m.name}</h3>
                    <h3 class="member-nickname">${m.nickname}</h3>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openProfile(m));
        return card;
    }

    function renderMembers(count, isReset = false) {
        if (isReset) {
            memberGrid.innerHTML = '';
            currentIndex = 0;
            isShowingAll = false;
        }

        const nextItems = members.slice(currentIndex, currentIndex + count);
        nextItems.forEach(m => {
            const card = createMemberCard(m);
            memberGrid.appendChild(card);
        });

        currentIndex += nextItems.length;
        const initialCount = getInitialItemsCount();
        if (members.length <= initialCount) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
            if (currentIndex >= members.length) {
                isShowingAll = true;
                loadMoreBtn.innerHTML = 'Ẩn bớt <i class="fas fa-chevron-up"></i>';
            } else {
                isShowingAll = false;
                loadMoreBtn.innerHTML = 'Xem thêm <i class="fas fa-chevron-down"></i>';
            }
        }
    }

    if (loadMoreBtn) {
        renderMembers(getInitialItemsCount());

        loadMoreBtn.addEventListener('click', () => {
            if (isShowingAll) {
                renderMembers(getInitialItemsCount(), true);
                const membersSection = document.getElementById('members');
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = membersSection.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                renderMembers(3); 
            }
        });
    }

    function program(delay = 200) {
      (function () {
        const _b = (s) => decodeURIComponent(escape(atob(s)));
        const _d = [
          "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
          "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
          "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI="
        ];
    
        setTimeout(() => {
          _d.forEach(x => console.log(_b(x)));
        }, delay);
      })();
    }

    const profileModal = document.getElementById('profileModal');
    const closeProfile = document.querySelector('.close-profile');
    const modalCard = profileModal.querySelector('.modal-card');

    function openProfile(m) {
        document.getElementById('profileImg').src = m.img;
        document.getElementById('profileName').innerText = m.name;
        document.getElementById('profileNickname').innerText = m.nickname;
        document.getElementById('profileHobbies').innerText = m.hobbies;
        document.getElementById('profileMessage').innerText = m.message;
        
        profileModal.style.display = 'flex';
        setTimeout(() => modalCard.classList.add('show'), 10);
    }

    closeProfile.addEventListener('click', () => {
        modalCard.classList.remove('show');
        setTimeout(() => profileModal.style.display = 'none', 300);
    });

    const galleryGrid = document.getElementById('galleryGrid');
    const galleryImages = [];
    const layoutClasses = ['', 'wide', 'tall', ''];

    for (let i = 1; i <= 27; i++) {
        const randomClass = layoutClasses[Math.floor(Math.random() * layoutClasses.length)];
        galleryImages.push({
            src: `style/img/AnhTapThe/Anh (${i}).jpg`,
            class: randomClass
        });
    }

    galleryImages.forEach(img => {
        const item = document.createElement('div');
        item.className = `gallery-item ${img.class}`;
        item.innerHTML = `<img src="${img.src}" alt="Gallery image" loading="lazy">`;
        item.addEventListener('click', () => openLightbox(img.src));
        galleryGrid.appendChild(item);
    });

    setInterval(() => {
        const grid = document.getElementById('galleryGrid');
        const items = document.querySelectorAll('.gallery-item');
        
        grid.style.opacity = '0';
        grid.style.transform = 'scale(0.98)';
        grid.style.transition = 'all 0.6s ease-in-out';

        setTimeout(() => {
            items.forEach(item => {
                item.classList.remove('wide', 'tall');
                const newLayout = layoutClasses[Math.floor(Math.random() * layoutClasses.length)];
                if (newLayout) item.classList.add(newLayout);
            });

            grid.style.opacity = '1';
            grid.style.transform = 'scale(1)';
        }, 600); // Match this with the transition time
    }, 15000);

    // 6. Gallery Lightbox & Reactions
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentImgIndex = 0;

    function openLightbox(src) {
        currentImgIndex = galleryImages.findIndex(img => img.src === src);
        updateModalImage();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function updateModalImage() {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = galleryImages[currentImgIndex].src;
            modalImg.style.opacity = '1';
        }, 150);
    }

    function showNext() {
        currentImgIndex = (currentImgIndex + 1) % galleryImages.length;
        updateModalImage();
    }

    function showPrev() {
        currentImgIndex = (currentImgIndex - 1 + galleryImages.length) % galleryImages.length;
        updateModalImage();
    }

    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    closeModal.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target == profileModal) {
            modalCard.classList.remove('show');
            setTimeout(() => profileModal.style.display = 'none', 300);
        };
    };

    // Reaction System
    const reactionItems = document.querySelectorAll('.reaction-item');
    let clickCounts = {};
    let holdTimers = {};

    program();
    
    reactionItems.forEach(item => {
        const emoji = item.getAttribute('data-emoji');
        clickCounts[emoji] = 0;

        const startContinuousFloating = (x, y) => {
            // Initial one
            createFloatingEmoji(emoji, x, y);
            // Continuous
            item.floatInterval = setInterval(() => {
                createFloatingEmoji(emoji, x, y);
            }, 100);
        };

        const stopContinuousFloating = () => {
            clearInterval(item.floatInterval);
            clearTimeout(holdTimers[emoji]);
        };

        item.addEventListener('mousedown', (e) => {
            startContinuousFloating(e.clientX, e.clientY);
            
            // Rapid click logic
            clickCounts[emoji]++;
            if (clickCounts[emoji] >= 10) {
                createEmojiRain(emoji);
                clickCounts[emoji] = 0;
            }
            clearTimeout(item.clickTimeout);
            item.clickTimeout = setTimeout(() => { clickCounts[emoji] = 0; }, 2000);

            // Long press rain logic
            holdTimers[emoji] = setTimeout(() => {
                createEmojiRain(emoji);
            }, 800);
        });

        item.addEventListener('mouseup', stopContinuousFloating);
        item.addEventListener('mouseleave', stopContinuousFloating);

        // Touch support
        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            startContinuousFloating(touch.clientX, touch.clientY);
            holdTimers[emoji] = setTimeout(() => {
                createEmojiRain(emoji);
            }, 800);
        });
        item.addEventListener('touchend', stopContinuousFloating);
    });

    function createFloatingEmoji(emoji, x, y) {
        const span = document.createElement('span');
        span.innerText = emoji;
        span.className = 'floating-emoji';
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        span.style.setProperty('--random-x', (Math.random() * 100 - 50) + 'px');
        span.style.setProperty('--random-rotate', (Math.random() * 40 - 20) + 'deg');
        document.body.appendChild(span);
        setTimeout(() => span.remove(), 1500);
    }

    function createEmojiRain(emoji) {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const rain = document.createElement('span');
                rain.innerText = emoji;
                rain.className = 'rain-emoji';
                rain.style.left = Math.random() * 100 + 'vw';
                rain.style.animationDelay = (Math.random() * 1.5) + 's';
                document.body.appendChild(rain);
                setTimeout(() => rain.remove(), 4000);
            }, i * 60);
        }
    }
    const stickyNotes = document.getElementById('stickyNotes');
    const loadMoreGuestbook = document.getElementById('loadMoreGuestbook');
    let guestbookData = [];
    let mobilePageIdx = 0;
    let isDesktopExpanded = false;
    let mobileInterval;

    function getGuestbookMode() {
        return window.innerWidth <= 768 ? 'mobile' : 'desktop';
    }

    function addNoteDOM(text, isNew = false) {
        const note = document.createElement('div');
        const randomColorIdx = Math.floor(Math.random() * 6) + 1;
        note.className = `sticky-note color-${randomColorIdx} note-appear`;
        
        let contentHTML = '';
        const trimmedText = text.trim();
        const lastDashIdx = trimmedText.lastIndexOf('-');
        
        if (lastDashIdx !== -1 && lastDashIdx > trimmedText.length - 25) {
            const content = trimmedText.substring(0, lastDashIdx).trim();
            const signature = trimmedText.substring(lastDashIdx + 1).trim();
            contentHTML = `<p>${content}</p><span class="signature">- ${signature}</span>`;
        } else {
            contentHTML = `<p>${trimmedText}</p>`;
        }

        note.innerHTML = `
            ${contentHTML}
            <i class="fas fa-thumbtack" style="position:absolute; top:10px; right:10px; color:rgba(0,0,0,0.1);"></i>
        `;
        const randomRotate = Math.floor(Math.random() * 20) - 10;
        note.style.transform = `rotate(${randomRotate}deg)`;
        
        if (isNew) stickyNotes.prepend(note);
        else stickyNotes.appendChild(note);
    }

    function renderGuestbook() {
        if (!stickyNotes) return;
        const mode = getGuestbookMode();
        stickyNotes.innerHTML = '';

        if (mode === 'mobile') {
            stickyNotes.classList.remove('collapsed');
            const start = mobilePageIdx % guestbookData.length;
            const note1 = guestbookData[start];
            const note2 = guestbookData[(start + 1) % guestbookData.length];
            
            if (note1) addNoteDOM(note1);
            if (note2) addNoteDOM(note2);

            loadMoreGuestbook.innerHTML = 'Thêm lời nhắn khác <i class="fas fa-sync"></i>';
        } else {
            guestbookData.forEach(text => addNoteDOM(text));
            if (isDesktopExpanded) {
                stickyNotes.classList.remove('collapsed');
                loadMoreGuestbook.innerHTML = 'Ẩn bớt lời nhắn <i class="fas fa-chevron-up"></i>';
            } else {
                stickyNotes.classList.add('collapsed');
                loadMoreGuestbook.innerHTML = 'Xem thêm lời nhắn <i class="fas fa-chevron-down"></i>';
            }
        }
    }

    function startMobileCycle() {
        clearInterval(mobileInterval);
        if (getGuestbookMode() === 'mobile') {
            mobileInterval = setInterval(() => {
                mobilePageIdx = (mobilePageIdx + 2) % guestbookData.length;
                renderGuestbook();
            }, 30000);
        }
    }

    fetch('style/guestbook.txt')
        .then(res => res.text())
        .then(data => {
            guestbookData = data.trim().split('\n').filter(line => line.trim());
            renderGuestbook();
            startMobileCycle();
        })
        .catch(err => console.error("Could not load guestbook.txt", err));

    window.addEventListener('resize', () => {
        renderGuestbook();
        startMobileCycle();
    });

    if (loadMoreGuestbook) {
        loadMoreGuestbook.addEventListener('click', () => {
            if (getGuestbookMode() === 'mobile') {
                mobilePageIdx = (mobilePageIdx + 2) % guestbookData.length;
                renderGuestbook();
                startMobileCycle(); 
            } else {
                isDesktopExpanded = !isDesktopExpanded;
                renderGuestbook();
            }
        });
    }

    const musicMenu = document.getElementById('musicMenu');
    const musicModal = document.getElementById('musicModal');
    const closeMusic = document.querySelector('.close-music');
    const musicOptions = document.querySelectorAll('.music-option');
    const bgMusic = document.getElementById('bg-music');
    const musicOptionsArray = Array.from(musicOptions);
    let currentSongIdx = 0;

    function playSongAtIndex(index) {
        if (index < 0) index = musicOptionsArray.length - 1;
        if (index >= musicOptionsArray.length) index = 0;
        
        currentSongIdx = index;
        const option = musicOptionsArray[currentSongIdx];
        const src = option.getAttribute('data-src');
        const img = option.getAttribute('data-img');
        const title = option.querySelector('strong') ? option.querySelector('strong').innerText : '';
        
        const currentAlbumArt = document.getElementById('currentAlbumArt');
        const currentSongTitle = document.getElementById('currentSongTitle');
        const mainPlayBtn = document.getElementById('mainPlayBtn');

        musicOptionsArray.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        bgMusic.src = src;
        bgMusic.play().then(() => {
            musicModal.classList.add('playing');
            mainPlayBtn.className = 'fas fa-pause';
        }).catch(e => console.log('Playback error:', e));
        
        if (currentAlbumArt && img) currentAlbumArt.src = img;
        if (currentSongTitle) {
            currentSongTitle.innerText = title;
            currentSongTitle.style.animation = 'none';
            currentSongTitle.offsetHeight; 
            currentSongTitle.style.animation = '';
        }
    }

    if (musicMenu) {
        musicMenu.addEventListener('click', () => {
            const card = musicModal.querySelector('.modal-card');
            musicModal.style.display = 'flex';
            setTimeout(() => card.classList.add('show'), 10);
        });
    }

    if (closeMusic) {
        closeMusic.addEventListener('click', () => {
            const card = musicModal.querySelector('.modal-card');
            card.classList.remove('show');
            setTimeout(() => musicModal.style.display = 'none', 300);
        });
    }

    musicOptionsArray.forEach((option, index) => {
        option.addEventListener('click', () => {
            playSongAtIndex(index);
        });
    });

    const mainPlayBtn = document.getElementById('mainPlayBtn');
    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', () => {            
            if (!bgMusic.src || bgMusic.src === "" || bgMusic.src.endsWith('index.html') || bgMusic.getAttribute('src') === null) {
                playSongAtIndex(0);
                return;
            }

            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicModal.classList.add('playing');
                    mainPlayBtn.className = 'fas fa-pause';
                });
            } else {
                bgMusic.pause();
                musicModal.classList.remove('playing');
                mainPlayBtn.className = 'fas fa-play';
            }
        });
    }

    const prevSongBtn = document.getElementById('prevSongBtn');
    if (bgMusic) {
        bgMusic.addEventListener('ended', () => {
            playSongAtIndex(currentSongIdx + 1);
        });
    }

    const nextSongBtn = document.getElementById('nextSongBtn');

    if (prevSongBtn) {
        prevSongBtn.addEventListener('click', () => {
            playSongAtIndex(currentSongIdx - 1);
        });
    }

    if (nextSongBtn) {
        nextSongBtn.addEventListener('click', () => {
            playSongAtIndex(currentSongIdx + 1);
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === musicModal) {
            const card = musicModal.querySelector('.modal-card');
            card.classList.remove('show');
            setTimeout(() => musicModal.style.display = 'none', 300);
        }
    });

    const timelineList = document.getElementById('timelineList');
    const loadMoreTimeline = document.getElementById('loadMoreTimeline');
    let timelineData = [];
    let displayedTimelineCount = 0;

    function renderTimelineChunk(count) {
        const nextItems = timelineData.slice(displayedTimelineCount, displayedTimelineCount + count);
        nextItems.forEach((itemData, index) => {
            const actualIndex = displayedTimelineCount + index;
            const item = document.createElement('div');
            item.className = `timeline-item ${actualIndex % 2 === 0 ? 'left' : 'right'} animate-up`;
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <span class="date">${itemData.date}</span>
                    <h3>${itemData.title}</h3>
                    <p>${itemData.desc}</p>
                </div>
            `;
            timelineList.appendChild(item);
        });

        displayedTimelineCount += nextItems.length;
        if (displayedTimelineCount >= timelineData.length) {
            loadMoreTimeline.style.display = 'none';
        }
    }

    if (timelineList) {
        fetch('style/timeline.txt')
            .then(res => res.text())
            .then(data => {
                const lines = data.trim().split('\n');
                timelineData = lines.map(line => {
                    const parts = line.split('|').map(p => p.trim());
                    return parts.length >= 3 ? { date: parts[0], title: parts[1], desc: parts[2] } : null;
                }).filter(i => i);

                renderTimelineChunk(4);
            })
            .catch(err => console.error("Could not load timeline.txt", err));

        loadMoreTimeline.addEventListener('click', () => {
            renderTimelineChunk(4);
        });
    }

    function createParticle() {
        const hero = document.getElementById('home');
        if (!hero) return;
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.background = 'rgba(255, 255, 255, 0.4)';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.zIndex = '1';
        particle.style.pointerEvents = 'none';
        
        hero.appendChild(particle);

        const animation = particle.animate([
            { transform: 'translateY(0) translateX(0)', opacity: 0 },
            { transform: `translateY(-${Math.random() * 100}px) translateX(${Math.random() * 50 - 25}px)`, opacity: 0.8 },
            { transform: `translateY(-${Math.random() * 200}px) translateX(${Math.random() * 100 - 50}px)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });

        animation.onfinish = () => particle.remove();
    }

    setInterval(createParticle, 300);
});
