function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    tempArea.setAttribute('readonly', '');
    tempArea.style.position = 'fixed';
    tempArea.style.top = '-9999px';
    tempArea.style.left = '-9999px';
    document.body.appendChild(tempArea);
    tempArea.focus();
    tempArea.select();

    try {
      const copied = document.execCommand('copy');
      document.body.removeChild(tempArea);
      if (copied) {
        resolve();
      } else {
        reject(new Error('Copy command failed'));
      }
    } catch (error) {
      document.body.removeChild(tempArea);
      reject(error);
    }
  });
}

const sendBtn = document.getElementById('cfSendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      window.showToast('Please fill in all fields.');
      return;
    }

    const msgText = `From: ${name}\nReply-to: ${email}\n\n${message}`;
    copyToClipboard(msgText).then(() => {
      window.showToast('Message copied. Paste it in your email to singh.gaurav.mlops@gmail.com.');
      document.getElementById('cf-name').value = '';
      document.getElementById('cf-email').value = '';
      document.getElementById('cf-message').value = '';
    }).catch(() => {
      window.showToast('Email me at singh.gaurav.mlops@gmail.com.');
    });
  });
}
