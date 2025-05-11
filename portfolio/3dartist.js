document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('show');
  });

  // Gallery load more functionality
  const loadMoreBtn = document.getElementById('loadMore');
  const extraImages = document.querySelectorAll('.gallery-item.extra-images');
  
  if (loadMoreBtn && extraImages.length > 0) {
    loadMoreBtn.addEventListener('click', function() {
      const isHidden = extraImages[0].style.display === 'none' || 
                      extraImages[0].style.display === '';
      
      extraImages.forEach(item => {
        item.style.display = isHidden ? 'block' : 'none';
      });
      
      loadMoreBtn.classList.toggle('active', isHidden);
      
      // Toggle button text
      document.querySelector('.show-text').style.display = isHidden ? 'none' : 'inline';
      document.querySelector('.hide-text').style.display = isHidden ? 'inline' : 'none';
    });
    
    // Hide extra images initially
    extraImages.forEach(item => {
      item.style.display = 'none';
    });
  }

  // Animation panel functionality
  const animationToggle = document.getElementById('animationToggle');
  const animationPanel = document.getElementById('animationPanel');
  const closeAnimationPanel = document.getElementById('closeAnimationPanel');
  
  if (animationToggle && animationPanel) {
    animationToggle.addEventListener('click', function() {
      animationPanel.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
    
    closeAnimationPanel.addEventListener('click', function() {
      animationPanel.classList.remove('show');
      document.body.style.overflow = 'auto';
    });
    
    // Close panel when clicking outside content
    animationPanel.addEventListener('click', function(e) {
      if (e.target === animationPanel) {
        animationPanel.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Modal functionality
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.getElementById('closeModal');
  
  function openModal(src, alt) {
    modalImage.src = src;
    modalCaption.textContent = alt;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    });
  }
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Set current year in footer
  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;
  
  // Initialize view buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const img = this.closest('.gallery-item').querySelector('img');
      openModal(img.src, img.alt);
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainNav.classList.contains('show')) {
          mainNav.classList.remove('show');
        }
      }
    });
  });
});