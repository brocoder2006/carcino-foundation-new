/**
 * Self-contained HTML portal for authorized human administrators
 * accessing the Daily Digest cron endpoint via a web browser.
 */
export function getAdminCronPortalHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Daily Digest Access — The Carcino Foundation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: #08080a;
      color: #f1f1f4;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      overflow-x: hidden;
      position: relative;
    }

    /* Ambient Lighting */
    .glow-bg {
      position: fixed;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 700px;
      height: 450px;
      background: radial-gradient(circle, rgba(152, 117, 193, 0.18) 0%, rgba(57, 198, 156, 0.08) 40%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 500px;
      background: rgba(18, 18, 24, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-radius: 24px;
      padding: 40px 32px;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05);
    }

    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 20px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(152, 117, 193, 0.15);
      color: #CDA8E8;
      border: 1px solid rgba(152, 117, 193, 0.3);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #39C69C;
      box-shadow: 0 0 8px #39C69C;
    }

    .ist-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(57, 198, 156, 0.12);
      color: #39C69C;
      border: 1px solid rgba(57, 198, 156, 0.3);
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.2px;
    }

    .ist-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #39C69C;
      box-shadow: 0 0 6px #39C69C;
      animation: pulse 2s infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.8); }
    }

    h1 {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #ffffff 40%, #CDA8E8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }

    p.subtitle {
      font-size: 13px;
      color: #9e9ea7;
      line-height: 1.5;
      margin-bottom: 28px;
    }

    .form-group {
      margin-bottom: 20px;
      position: relative;
    }

    label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #c9c9d4;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    input[type="password"], input[type="text"] {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 13px 44px 13px 16px;
      color: #ffffff;
      font-size: 14px;
      font-family: 'JetBrains Mono', monospace;
      outline: none;
      transition: all 0.2s ease;
    }

    input:focus {
      border-color: #CDA8E8;
      box-shadow: 0 0 0 3px rgba(152, 117, 193, 0.25);
      background: rgba(255, 255, 255, 0.07);
    }

    .toggle-btn {
      position: absolute;
      right: 12px;
      background: transparent;
      border: none;
      color: #888899;
      cursor: pointer;
      font-size: 14px;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }
    .toggle-btn:hover { color: #ffffff; }

    .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, #CDA8E8 0%, #39C69C 100%);
      color: #050505;
      border: none;
      border-radius: 12px;
      padding: 14px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 8px;
      box-shadow: 0 10px 25px rgba(205, 168, 232, 0.25);
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 14px 30px rgba(205, 168, 232, 0.35);
      filter: brightness(1.05);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-top-color: #000;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      display: none;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Result Cards */
    .status-card {
      display: none;
      margin-top: 24px;
      padding: 18px;
      border-radius: 14px;
      font-size: 13px;
      line-height: 1.6;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

    .status-card.error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }

    .status-card.success {
      background: rgba(57, 198, 156, 0.1);
      border: 1px solid rgba(57, 198, 156, 0.3);
      color: #a7f3d0;
    }

    .result-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: #e4e4e7;
    }
    .result-row:last-child { border-bottom: none; }
    .result-label { color: #a1a1aa; font-weight: 500; }
    .result-val { font-family: 'JetBrains Mono', monospace; font-weight: 600; color: #ffffff; }

    .footer-note {
      margin-top: 24px;
      text-align: center;
      font-size: 11px;
      color: #71717a;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="glow-bg"></div>

  <div class="container">
    <div class="header-bar">
      <div class="badge">
        <span class="badge-dot"></span>
        Admin Portal
      </div>
      <div class="ist-badge">
        <span class="ist-dot"></span>
        <span id="liveIstClock">--:--:-- IST</span>
      </div>
    </div>

    <h1>Daily Digest Dispatcher</h1>
    <p class="subtitle">
      Generate an updated Master Excel report containing all cumulative platform registrations and deliver it immediately to the Foundation Administrator mailbox.
    </p>

    <form id="digestForm">
      <div class="form-group">
        <label for="cronSecret">Master Cron Secret Key</label>
        <div class="input-wrapper">
          <input
            type="password"
            id="cronSecret"
            name="cronSecret"
            placeholder="Enter server CRON_SECRET"
            required
            autocomplete="current-password"
            spellcheck="false"
          />
          <button type="button" class="toggle-btn" id="toggleSecret" title="Show or hide secret">
            👁️
          </button>
        </div>
      </div>

      <button type="submit" class="btn-submit" id="submitBtn">
        <span class="spinner" id="spinner"></span>
        <span id="btnText">Trigger Master Digest Now</span>
      </button>
    </form>

    <div id="statusCard" class="status-card"></div>

    <div class="footer-note">
      Protected endpoint · The Carcino Foundation Platform<br/>
      Automated schedulers pass <code style="color:#CDA8E8; font-family:'JetBrains Mono';">Authorization: Bearer &lt;CRON_SECRET&gt;</code>.
    </div>
  </div>

  <script>
    const form = document.getElementById('digestForm');
    const secretInput = document.getElementById('cronSecret');
    const toggleBtn = document.getElementById('toggleSecret');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const btnText = document.getElementById('btnText');
    const statusCard = document.getElementById('statusCard');

    // Toggle password visibility
    toggleBtn.addEventListener('click', () => {
      const isPass = secretInput.type === 'password';
      secretInput.type = isPass ? 'text' : 'password';
      toggleBtn.textContent = isPass ? '🔒' : '👁️';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const secret = secretInput.value.trim();
      if (!secret) return;

      submitBtn.disabled = true;
      spinner.style.display = 'inline-block';
      btnText.textContent = 'Compiling & Delivering Excel...';
      statusCard.style.display = 'none';

      try {
        const response = await fetch('/api/cron/daily-digest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + secret,
            'Accept': 'application/json'
          },
          body: JSON.stringify({ manualTrigger: true })
        });

        const data = await response.json();

        statusCard.style.display = 'block';
        if (response.ok && data.success) {
          statusCard.className = 'status-card success';
          statusCard.innerHTML = \`
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 10px; color: #39C69C;">
              ✓ Master Digest Dispatched Successfully
            </div>
            <div class="result-row">
              <span class="result-label">Status:</span>
              <span class="result-val">Delivered via SMTP</span>
            </div>
            <div class="result-row">
              <span class="result-label">Total Records Compiled:</span>
              <span class="result-val">\${data.totalRegistrations}</span>
            </div>
            <div class="result-row">
              <span class="result-label">Delivered Time (IST):</span>
              <span class="result-val">\${formatIST(data.timestamp || Date.now())}</span>
            </div>
            <p style="margin-top: 10px; font-size: 12px; color: #c9c9d4;">
              \${data.message || 'The updated Master Excel workbook has been emailed to the administrator.'}
            </p>
          \`;
        } else {
          statusCard.className = 'status-card error';
          statusCard.innerHTML = \`
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #f87171;">
              ✕ Authentication Failed
            </div>
            <p>\${data.error || 'Invalid Cron Secret Key. Access was rejected.'}</p>
          \`;
        }
      } catch (err) {
        statusCard.style.display = 'block';
        statusCard.className = 'status-card error';
        statusCard.innerHTML = \`
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: #f87171;">
            ✕ Execution Error
          </div>
          <p>\${err.message || 'Failed to reach server. Please check your network connection.'}</p>
        \`;
      } finally {
        submitBtn.disabled = false;
        spinner.style.display = 'none';
        btnText.textContent = 'Trigger Master Digest Now';
      }
    });

    // Format ISO or timestamp to Indian Standard Time (IST)
    function formatIST(isoDate) {
      const d = isoDate ? new Date(isoDate) : new Date();
      return d.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }) + ' IST';
    }

    // Live Indian Standard Time (IST) Clock
    function updateLiveISTClock() {
      const now = new Date();
      const clockStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const clockEl = document.getElementById('liveIstClock');
      if (clockEl) {
        clockEl.textContent = clockStr + ' IST';
      }
    }
    setInterval(updateLiveISTClock, 1000);
    updateLiveISTClock();
  </script>
</body>
</html>`;
}
