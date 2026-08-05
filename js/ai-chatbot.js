/* ==========================================
   INTERACTIVE AI MARKETING ASSISTANT CHATBOT
   Knowledge Base: Harsh Tiwari's Complete Resume
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('ai-chatbot-toggle');
  const chatWindow = document.getElementById('ai-chatbot-window');
  const closeBtn = document.getElementById('ai-chat-close');
  const messagesContainer = document.getElementById('ai-chat-messages');
  const inputField = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  const promptChips = document.querySelectorAll('.chat-prompt-chip');

  if (!toggleBtn || !chatWindow) return;

  function toggleWindow() {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      inputField.focus();
    }
  }

  toggleBtn.addEventListener('click', toggleWindow);
  if (closeBtn) closeBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

  window.toggleAIChat = toggleWindow;

  // Knowledge base responses based on keywords in user queries
  const kb = [
    {
      keywords: ['pipeline', 'revenue', 'money', '$2.1m', '$1.8m', 'budget', 'roi'],
      response: "Harsh has managed a $100K marketing budget to generate a **$2.1M organic qualified pipeline** at HyTech Professionals across two major business divisions, achieving a **67% organic traffic growth** and capturing **53% of total leads** via organic channels."
    },
    {
      keywords: ['experience', 'work', 'hytech', 'izidigi', 'history', 'role', 'jobs'],
      response: "Harsh brings **6+ years of specialized experience**:\n• **SEO Specialist / Growth Lead** @ HyTech Professionals (Apr 2023 - May 2026)\n• **SEO Specialist** @ IziDigi (Nov 2020 - Apr 2023) - Directed 18 Executives & 3 Team Leads across 6 multi-service client projects.\n• **Digital Marketing Trainee** @ TechStack (Feb 2020 - Oct 2020)."
    },
    {
      keywords: ['skills', 'tools', 'stack', 'seo', 'geo', 'aeo', 'python', 'n8n', 'ai'],
      response: "Harsh's core technical stack includes:\n• **Search Strategy**: GEO, AEO, AI Overviews (AIO), Technical SEO, Core Web Vitals.\n• **Automation & AI**: n8n workflows, Python scripting, Google Apps Script, ChatGPT, Claude Enterprise, Gemini.\n• **Analytics & Paid**: GA4, Looker Studio, GTM, Google Ads Manager, ZoomInfo Intent, Apollo.io."
    },
    {
      keywords: ['education', 'degree', 'mba', 'btech', 'college', 'university'],
      response: "Harsh holds:\n1. **MBA (Marketing Major)** from PSIT Kanpur (2017 – 2019, CGPA: 7.46) with minor in HR & Leadership.\n2. **B.Tech (Electrical & Electronics Engineering)** from KIT Kanpur (2012 – 2016, CGPA: 6.53)."
    },
    {
      keywords: ['award', 'certifications', 'semrush', 'google ads', 'hubspot'],
      response: "Harsh was awarded the **Individual Excellence Award (2025-2026)** at HyTech Professionals for outstanding revenue impact! He is certified in **Semrush Management**, **Google Ads**, **Google Analytics (GA4)**, **HubSpot Inbound Marketing**, and **Meta Marketing**."
    },
    {
      keywords: ['contact', 'hire', 'email', 'phone', 'linkedin', 'location'],
      response: "You can reach out directly to Harsh Tiwari:\n📧 **Email**: harshtiwari163@gmail.com\n📞 **Phone**: +91 8840180847\n🔗 **LinkedIn**: linkedin.com/in/er-harsh-tiwari\n📍 **Location**: Ghaziabad, India (Available for Remote / Relocation)."
    }
  ];

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`;
    
    const bubble = document.createElement('div');
    bubble.className = `max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
      sender === 'user'
        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
        : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
    }`;
    
    // Format simple markdown bold and bullet points
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br/>');
    bubble.innerHTML = formattedText;
    
    msgDiv.appendChild(bubble);
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function processQuery(query) {
    if (!query.trim()) return;
    appendMessage('user', query);

    // Typing indicator delay
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'flex justify-start mb-3 id-typing';
    typingIndicator.innerHTML = `<div class="bg-slate-800 text-slate-400 px-4 py-2 rounded-2xl text-xs italic">Harsh AI is typing...</div>`;
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const lower = query.toLowerCase();
      let match = kb.find(item => item.keywords.some(kw => lower.includes(kw)));
      
      if (match) {
        appendMessage('bot', match.response);
      } else {
        appendMessage('bot', "Harsh Tiwari is an **AI-Powered Growth Marketing Manager & SEO Specialist** with 6+ years experience scaling B2B SaaS traffic (+67%) and generating $2.1M in organic pipeline. Feel free to ask about his **skills**, **pipeline stats**, **case studies**, or **contact info**!");
      }
    }, 600);
  }

  sendBtn.addEventListener('click', () => {
    const val = inputField.value;
    inputField.value = '';
    processQuery(val);
  });

  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputField.value;
      inputField.value = '';
      processQuery(val);
    }
  });

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      processQuery(chip.textContent.trim());
    });
  });
});
