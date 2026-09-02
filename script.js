/* =========================================================
   Portfolio — script.js
   Vanilla JavaScript only, no dependencies
   ========================================================= */

/* ---------------------------------------------------------
   ปีปัจจุบันใน Footer
--------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   Navbar: เปลี่ยนพื้นหลังเมื่อ scroll + แถบ progress + active link
--------------------------------------------------------- */
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = percent + '%';
  navbar.classList.toggle('scrolled', scrollTop > 20);

  updateActiveLink(scrollTop);
}

function updateActiveLink(scrollTop) {
  let currentId = sections[0]?.id;
  sections.forEach((section) => {
    if (scrollTop + 140 >= section.offsetTop) currentId = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------------------------------------------------------
   เมนูมือถือ (Hamburger toggle)
--------------------------------------------------------- */
const menuToggle = document.getElementById('menuToggle');
const navLinksWrap = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinksWrap.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinksWrap.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------------------------------------------------------
   Scroll Reveal Animation (IntersectionObserver)
--------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------------------------------------------------------
   ข้อมูล Skills — แบ่งเป็นหมวดหมู่ เพิ่ม/แก้ไขได้ง่ายในอนาคตโดยแก้ array นี้
--------------------------------------------------------- */
const skillGroups = [
  {
    category: 'Programming Languages',
    items: ['HTML', 'CSS', 'JavaScript', 'C#', 'Python', 'SQL', 'Java'],
  },
  {
    category: 'Tools',
    items: [
      'Visual Studio Code',
      'Kali Linux (Basic)',
      'Power BI',
      'Microsoft Word',
      'Microsoft Excel',
      'Microsoft PowerPoint',
    ],
  },
  {
    category: 'Soft Skills',
    items: ['Communication', 'Teamwork', 'Time Management', 'Attention to Detail'],
  },
];

const skillsGrid = document.getElementById('skillsGrid');
skillsGrid.innerHTML = skillGroups
  .map(
    (group) => `
    <div class="skill-group reveal">
      <h3 class="skill-group-title">${group.category}</h3>
      <p class="skill-items">${group.items.join(', ')}</p>
    </div>`
  )
  .join('');

/* ---------------------------------------------------------
   ข้อมูล Certificates — เพิ่มใบรับรองใหม่ได้โดยเพิ่ม object ใน array นี้
   (ใส่ path รูปใน "image" เมื่อมีไฟล์ใบรับรองจริง)
--------------------------------------------------------- */
const certificates = [
  {
    title: 'Penetration Test Specialist',
    desc: 'หลักสูตรผู้เชี่ยวชาญเฉพาะด้าน การทดสอบเจาะระบบ (Penetration Test) ผ่านระบบ NCSA e-Learning จำนวน 28 ชั่วโมง',
    image: 'assets/cert-pentest.png',
    link: 'assets/cert-pentest.pdf',
  },
  {
    title: 'BU Cyber Fortress Hackathon 2026',
    desc: 'Certificate of Achievement — Honorable Mention การแข่งขัน BU Cyber Fortress Hackathon 2026',
    image: 'assets/cert-hackathon2026.png',
    link: 'assets/cert-hackathon2026.png',
  },
  {
    title: 'Cybersecurity Foundation Course',
    desc: 'หลักสูตรด้านความมั่นคงปลอดภัยไซเบอร์ ระดับพื้นฐาน ผ่านระบบ NCSA e-Learning จำนวน 21 ชั่วโมง',
    image: 'assets/cert-foundation.png',
    link: 'assets/cert-foundation.pdf',
  },
  {
    title: 'Cloud Security Standard for Practitioner',
    desc: 'หลักสูตรออนไลน์ Cloud Security Standard for Practitioner ผ่านระบบ NCSA e-Learning จำนวน 11 ชั่วโมง',
    image: 'assets/cert-cloudsecurity.png',
    link: 'assets/cert-cloudsecurity.pdf',
  },
];

const certGrid = document.getElementById('certGrid');
certGrid.innerHTML = certificates
  .map(
    (cert) => `
    <div class="cert-card reveal">
      <div class="cert-thumb">
        ${cert.image ? `<img src="${cert.image}" alt="${cert.title}" onerror="this.style.display='none';" />` : ''}
      </div>
      <div class="cert-body">
        <h3>${cert.title}</h3>
        <p>${cert.desc}</p>
        <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">View Certificate</a>
      </div>
    </div>`
  )
  .join('');

/* ---------------------------------------------------------
   ข้อมูล Projects — เพิ่มผลงานใหม่ได้โดยเพิ่ม object ใน array นี้
   (ใส่ path รูปใน "image" เมื่อมีภาพตัวอย่างจริง)
--------------------------------------------------------- */
const projects = [
  {
    title: '1Moby — Competency Assessment & LMS',
    desc: 'ระบบประเมินสมรรถนะและ LMS สำหรับองค์กร กำลังพัฒนาในรายวิชา CS497 และ CS498',
    detail: 'โปรเจกต์ 1Moby เป็นระบบ Competency Assessment & LMS Engagement System สำหรับองค์กร ที่กำลังพัฒนาในรายวิชา CS497 และ CS498 รองรับการประเมิน Core, Managerial และ Functional Competency, วิเคราะห์ Gap และสร้างแผนพัฒนารายบุคคล (IDP), ระบบเรียนรู้ผ่าน LMS พร้อม Quiz และใบรับรอง, ระบบภารกิจประจำวัน/สัปดาห์และคะแนนสะสมเพื่อสร้างการมีส่วนร่วมของพนักงาน',
    tags: ['LMS', 'Competency Assessment', 'CS497', 'CS498'],
    images: [
      'assets/project-1moby-1.png',
      'assets/project-1moby-2.png',
      'assets/project-1moby-3.png',
      'assets/project-1moby-4.png',
    ],
  },
  {
    title: 'BU Cyber Mini Hackathon 2025',
    desc: 'รางวัลชนะเลิศอันดับที่ 1 การแข่งขัน BU Cyber Mini Hackathon 2025 ด้านความมั่นคงปลอดภัยไซเบอร์',
    detail: 'ได้เข้าร่วมการเเข่งขัน Bu Cyber Mini Hackathon 2025 ในหัวข้อ Operational Security in the Digital Age \ โดยโปรเจคที่เราพัฒนาเเละได้รับรางวัลชนะเลิศที่1 คือ Project Clean Access ที่เกี่ยวกับระบบบริษัทโดยตรงในด้านของ HR IT \ โดยทำร่วมกันกับ นางสาววรัชนันท์ หยั่งถึง เเละ นางสาวสุภาภรณ์ ขันทะควน  ',
    tags: ['Cybersecurity', 'Hackathon', 'อันดับที่ 1'],
    images: ['assets/hackathon2025-1.jpg', 'assets/hackathon2025-2.jpg'],
  },
  {
    title: 'BU Cyber Fortress Challenge & Career Expo 2026',
    desc: 'รางวัลชมเชย การแข่งขัน BU Hackathon 2026 (Final Round Competition) ด้านความมั่นคงปลอดภัยไซเบอร์',
    detail: 'เข้าร่วมการแข่งขัน BU Cyber Fortress Challenge & Career Expo - BU Hackathon 2026 (Final Round Competition) จัดขึ้นเมื่อวันที่ 10 กุมภาพันธ์ 2569 ณ BU Diamond Hall ได้รับรางวัลชมเชย มูลค่า 3,000 บาท โดยทำร่วมกันกับ นางสาววรัชนันท์ หยั่งถึง เเละ นางสาวณัฐวรรณ ปัญหาชัย ',
    tags: ['Cybersecurity', 'Hackathon', 'รางวัลชมเชย'],
    images: ['assets/hackathon2026-1.jpg', 'assets/hackathon2026-2.jpg'],
  },
];

/* สร้าง slider รูปภาพ (ใช้ร่วมกันทั้งใน card และใน modal) */
function buildSlider(images, altBase, sizeClass) {
  const track = images
    .map((src) => `<img src="${src}" alt="${altBase}" onerror="this.closest('.thumb-slider').style.display='none';" />`)
    .join('');
  const nav = images.length > 1
    ? `
      <button type="button" class="thumb-nav prev" aria-label="รูปก่อนหน้า">‹</button>
      <button type="button" class="thumb-nav next" aria-label="รูปถัดไป">›</button>
      <div class="thumb-dots">${images.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('')}</div>`
    : '';
  return `<div class="thumb-slider ${sizeClass}" data-index="0"><div class="thumb-track">${track}</div>${nav}</div>`;
}

function slideTo(slider, newIndex) {
  const track = slider.querySelector('.thumb-track');
  const images = slider.querySelectorAll('.thumb-track img');
  const dots = slider.querySelectorAll('.dot');
  const total = images.length;
  const index = (newIndex + total) % total;

  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  slider.dataset.index = index;
}

document.body.addEventListener('click', (event) => {
  const navBtn = event.target.closest('.thumb-nav');
  if (!navBtn) return;
  const slider = navBtn.closest('.thumb-slider');
  const current = Number(slider.dataset.index);
  slideTo(slider, navBtn.classList.contains('next') ? current + 1 : current - 1);
});

const projectsGrid = document.getElementById('projectsGrid');
projectsGrid.innerHTML = projects
  .map(
    (project, index) => `
    <div class="project-card reveal">
      <div class="project-thumb">
        ${buildSlider(project.images, project.title, 'thumb-sm')}
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button type="button" class="btn btn-outline btn-sm project-readmore" data-index="${index}">Read More</button>
      </div>
    </div>`
  )
  .join('');

/* ---------------------------------------------------------
   Modal สำหรับ Read More — แสดงรูปใหญ่ (เลื่อนดูได้) และรายละเอียดเต็มของผลงาน
--------------------------------------------------------- */
const projectModal = document.getElementById('projectModal');
const modalImageWrap = document.getElementById('modalImageWrap');
const modalTitle = document.getElementById('modalTitle');
const modalDetail = document.getElementById('modalDetail');
const modalTags = document.getElementById('modalTags');
const modalClose = document.getElementById('modalClose');

function openProjectModal(index) {
  const project = projects[index];
  modalImageWrap.innerHTML = buildSlider(project.images, project.title, 'thumb-lg');
  modalTitle.textContent = project.title;
  modalDetail.textContent = project.detail || project.desc;
  modalTags.innerHTML = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');

  projectModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
}

projectsGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.project-readmore');
  if (!button) return;
  openProjectModal(Number(button.dataset.index));
});

modalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (event) => {
  if (event.target === projectModal) closeProjectModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && projectModal.classList.contains('open')) closeProjectModal();
});

/* หลังจากเติมเนื้อหา Skills / Certificates / Projects แล้ว ให้เริ่มสังเกต reveal การ์ดใหม่ */
document.querySelectorAll('.skill-group.reveal, .cert-card.reveal, .project-card.reveal')
  .forEach((el) => revealObserver.observe(el));
