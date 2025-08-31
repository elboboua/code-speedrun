import languagesData from './languages.json';

console.log('hello world');

function createLanguageCard(): HTMLElement {
  const card = document.createElement('div');
  card.className = 'language-card';
  card.style.cssText = `
    position: absolute;
    top: 45px;
    right: -300px;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: var(--shadow);
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    transition: right 0.3s ease-in-out, transform 0.3s ease-in-out;
    z-index: 1000;
    white-space: nowrap;
  `;
  
  document.body.appendChild(card);
  return card;
}

function animateLanguage(languageName: string, card: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    card.textContent = languageName;
    
    // Slide in from right to center
    setTimeout(() => {
      card.style.right = '50%';
      card.style.transform = 'translateX(50%)';
    }, 50);
    
    // Hold for 1 second, then slide out to left completely off screen
    setTimeout(() => {
      card.style.right = 'calc(100vw + 300px)';
      card.style.transform = 'none';
      
      // Reset position to right side off screen after animation
      setTimeout(() => {
        card.style.transition = 'none';
        card.style.right = '-300px';
        setTimeout(() => {
          card.style.transition = 'right 0.3s ease-in-out, transform 0.3s ease-in-out';
          resolve();
        }, 50);
      }, 300);
    }, 1350);
  });
}

async function startLanguageSlideshow(): Promise<void> {
  const card = createLanguageCard();
  const languages = languagesData.languages;
  let currentIndex = 0;
  
  const showNextLanguage = async (): Promise<void> => {
    await animateLanguage(languages[currentIndex].name, card);
    currentIndex = (currentIndex + 1) % languages.length;
    
    setTimeout(showNextLanguage, 100);
  };
  
  showNextLanguage();
}

startLanguageSlideshow();
