const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};

const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();
  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  const generatedQRcode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
      text: url,
      width: size,
      height: size,
    });
  };

  const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
  };
  const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
  };

  const SaveButton = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList =
      'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
  };

  if (url === '') {
    alert('Please Enter A URL');
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generatedQRcode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src;

        SaveButton(saveUrl);
      }, 50);
    }, 1000);
  }
};

form.addEventListener('submit', onGenerateSubmit);
