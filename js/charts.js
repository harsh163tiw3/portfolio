/* ==========================================
   INTERACTIVE CASE STUDY & METRICS CHARTS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') return;

  // Chart default dark configurations
  Chart.defaults.color = '#94A3B8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  // 1. Organic Traffic Growth Chart (+67% Growth)
  const trafficCtx = document.getElementById('trafficGrowthChart');
  if (trafficCtx) {
    const gradient = trafficCtx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    new Chart(trafficCtx, {
      type: 'line',
      data: {
        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q1 2026'],
        datasets: [{
          label: 'Organic Monthly Sessions (HyTech B2B Portfolio)',
          data: [28000, 34500, 42000, 51000, 68000, 81000, 95500],
          borderColor: '#3B82F6',
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#06B6D4',
          pointBorderColor: '#FFFFFF',
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#F8FAFC',
            bodyColor: '#38BDF8',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            displayColors: false
          }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { 
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { callback: value => `${value / 1000}k` }
          }
        }
      }
    });
  }

  // 2. Qualified Pipeline vs Lead Share Bar Chart ($2.1M Organic Pipeline)
  const pipelineCtx = document.getElementById('pipelineChart');
  if (pipelineCtx) {
    new Chart(pipelineCtx, {
      type: 'bar',
      data: {
        labels: ['SaaS Product Line A', 'SaaS Product Line B', 'Associations & Non-Profits', 'Enterprise ABM Deals'],
        datasets: [
          {
            label: 'Organic Qualified Pipeline ($)',
            data: [780000, 640000, 420000, 310000],
            backgroundColor: 'rgba(139, 92, 246, 0.75)',
            borderColor: '#8B5CF6',
            borderWidth: 1,
            borderRadius: 8
          },
          {
            label: 'Inorganic / Ad Retargeting ($)',
            data: [310000, 290000, 180000, 150000],
            backgroundColor: 'rgba(6, 182, 212, 0.65)',
            borderColor: '#06B6D4',
            borderWidth: 1,
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#CBD5E1' } },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: $${(context.raw / 1000).toFixed(0)}k`
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { callback: value => `$${value / 1000}k` }
          }
        }
      }
    });
  }
});
