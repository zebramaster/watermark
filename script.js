const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('canvas');
const canvasContainer = document.querySelector('.canvas-container');
const canvasPlaceholder = document.getElementById('canvas-placeholder');
const ctx = canvas.getContext('2d');
const watermarkText = document.getElementById('watermarkText');

const fontSize = document.getElementById('fontSize');
const fontSizeInput = document.getElementById('fontSizeInput');

const fontColor = document.getElementById('fontColor');
const fontColorInput = document.getElementById('fontColorInput');

const opacity = document.getElementById('opacity');
const opacityInput = document.getElementById('opacityInput');

const downloadBtn = document.getElementById('downloadBtn');
const languageSelector = document.getElementById('languageSelector');
const patternInputs = document.querySelectorAll('input[name="pattern"]');

const translations = {
    en: {
        title: 'Watermark Your Photos',
        subtitle: 'Upload an image, add your watermark, and download the result.',
        languageLabel: 'Language',
        uploadLabel: '1. Upload Your Image',
        textLabel: '2. Watermark Text',
        textPlaceholder: 'Your Brand',
        customizeLabel: '3. Customize',
        patternLabel: 'Pattern',
        sizeLabel: 'Font Size',
        colorLabel: 'Color',
        opacityLabel: 'Opacity',
        downloadBtn: '4. Download Image',
        minLabel: 'Min',
        maxLabel: 'Max',
        canvasPlaceholder: 'Your image will appear here',
        patternHint: '(You can check the preview image by uploading a photo)',
    },
    ko: {
        title: '사진에 워터마크 추가하기',
        subtitle: '이미지를 업로드하고 워터마크를 추가한 후 결과를 다운로드하세요.',
        languageLabel: '언어',
        uploadLabel: '1. 이미지 업로드',
        textLabel: '2. 워터마크 텍스트',
        textPlaceholder: '브랜드 이름',
        customizeLabel: '3. 사용자 정의',
        patternLabel: '패턴',
        sizeLabel: '글꼴 크기',
        colorLabel: '색상',
        opacityLabel: '투명도',
        downloadBtn: '4. 이미지 다운로드',
        minLabel: '최소',
        maxLabel: '최대',
        canvasPlaceholder: '이미지가 여기에 표시됩니다',
        patternHint: '(사진을 업로드하여 미리보기 이미지를 확인할 수 있습니다)',
    },
    ja: {
        title: '写真に透かしを入れる',
        subtitle: '画像をアップロードし、透かしを追加して、結果をダウンロードします。',
        languageLabel: '言語',
        uploadLabel: '1. 画像をアップロード',
        textLabel: '2. 透かしテキスト',
        textPlaceholder: 'あなたのブランド',
        customizeLabel: '3. カスタマイズ',
        patternLabel: 'パターン',
        sizeLabel: 'フォントサイズ',
        colorLabel: '色',
        opacityLabel: '不透明度',
        downloadBtn: '4. 画像をダウンロード',
        minLabel: '最小',
        maxLabel: '最大',
        canvasPlaceholder: '画像はここに表示されます',
        patternHint: '(写真をアップロードしてプレビュー画像を確認できます)',
    },
    es: {
        title: 'Poner Marca de Agua en tus Fotos',
        subtitle: 'Sube una imagen, añade tu marca de agua y descarga el resultado.',
        languageLabel: 'Idioma',
        uploadLabel: '1. Subir Imagen',
        textLabel: '2. Texto de la Marca de Agua',
        textPlaceholder: 'Tu Marca',
        customizeLabel: '3. Personalizar',
        patternLabel: 'Patrón',
        sizeLabel: 'Tamaño de Fuente',
        colorLabel: 'Color',
        opacityLabel: 'Opacidad',
        downloadBtn: '4. Descargar Imagen',
        minLabel: 'Mín',
        maxLabel: 'Máx',
        canvasPlaceholder: 'Tu imagen aparecerá aquí',
        patternHint: '(Puedes ver la imagen de vista previa subiendo una foto)',
    },
    fr: {
        title: 'Ajouter un Filigrane à vos Photos',
        subtitle: 'Téléchargez une image, ajoutez votre filigrane et téléchargez le résultat.',
        languageLabel: 'Langue',
        uploadLabel: '1. Télécharger l\'image',
        textLabel: '2. Texte du Filigrane',
        textPlaceholder: 'Votre Marque',
        customizeLabel: '3. Personnaliser',
        patternLabel: 'Motif',
        sizeLabel: 'Taille de la Police',
        colorLabel: 'Couleur',
        opacityLabel: 'Opacité',
        downloadBtn: '4. Télécharger l\'image',
        minLabel: 'Min',
        maxLabel: 'Max',
        canvasPlaceholder: 'Votre image apparaîtra ici',
        patternHint: '(Vous pouvez vérifier l\'image d\'aperçu en téléchargeant une photo)',
    },
    it: {
        title: 'Aggiungi una Filigrana alle tue Foto',
        subtitle: 'Carica un\'immagine, aggiungi la tua filigrana e scarica il risultato.',
        languageLabel: 'Lingua',
        uploadLabel: '1. Carica Immagine',
        textLabel: '2. Testo della Filigrana',
        textPlaceholder: 'Il Tuo Marchio',
        customizeLabel: '3. Personalizza',
        patternLabel: 'Modello',
        sizeLabel: 'Dimensione Carattere',
        colorLabel: 'Colore',
        opacityLabel: 'Opacità',
        downloadBtn: '4. Scarica Immagine',
        minLabel: 'Min',
        maxLabel: 'Massimo',
        canvasPlaceholder: 'La tua immagine apparirà qui',
        patternHint: '(Puoi controllare l\'immagine di anteprima caricando una foto)',
    },
    ar: {
        title: 'إضافة علامة مائية على صورك',
        subtitle: 'قم بتحميل صورة، أضف علامتك المائية، وقم بتنزيل النتيجة.',
        languageLabel: 'لغة',
        uploadLabel: '1. تحميل الصورة',
        textLabel: '2. نص العلامة المائية',
        textPlaceholder: 'علامتك التجارية',
        customizeLabel: '3. تخصيص',
        patternLabel: 'نمط',
        sizeLabel: 'حجم الخط',
        colorLabel: 'اللون',
        opacityLabel: 'شفافية',
        downloadBtn: '4. تنزيل الصورة',
        minLabel: 'الحد الأدنى',
        maxLabel: 'الحد الأقصى',
        canvasPlaceholder: 'صورتك ستظهر هنا',
        patternHint: '(يمكنك التحقق من الصورة المعاينة عن طريق تحميل صورة)',
    },
};

let img = new Image();
let watermark = {
    text: '',
    x: 0,
    y: 0,
    size: 40,
    color: '#ffffff',
    alpha: 0.5,
    pattern: 'single'
};
let dragging = false;
let dragStartX, dragStartY;

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    // Update watermark text and input value
    watermark.text = translations[lang].textPlaceholder || 'Your Brand';
    watermarkText.value = watermark.text;
    if (img.src) { // Only redraw if an image is loaded
        redraw();
    }
}

languageSelector.addEventListener('change', (e) => setLanguage(e.target.value));

// Initialize with default language
setLanguage('en');

imageLoader.addEventListener('change', handleImage, false);
watermarkText.addEventListener('input', updateWatermark);

fontSize.addEventListener('input', (e) => {
    fontSizeInput.value = e.target.value;
    updateWatermark();
});
fontSizeInput.addEventListener('input', (e) => {
    fontSize.value = e.target.value;
    updateWatermark();
});

fontColor.addEventListener('input', (e) => {
    fontColorInput.value = e.target.value;
    updateWatermark();
});
fontColorInput.addEventListener('input', (e) => {
    fontColor.value = e.target.value;
    updateWatermark();
});

opacity.addEventListener('input', (e) => {
    opacityInput.value = Math.round(e.target.value * 100);
    updateWatermark();
});
opacityInput.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
        opacity.value = Math.max(0, Math.min(100, value)) / 100;
    }
    updateWatermark();
});

patternInputs.forEach(input => input.addEventListener('change', updateWatermark));
canvas.addEventListener('mousedown', startDrag);
canvas.addEventListener('mousemove', drag);
canvas.addEventListener('mouseup', stopDrag);
canvas.addEventListener('mouseleave', stopDrag);
downloadBtn.addEventListener('click', downloadImage);
window.addEventListener('resize', resizeCanvas, false);

function handleImage(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img.onload = function() {
            canvasPlaceholder.style.display = 'none';
            canvas.style.display = 'block';
            resizeCanvas();
            setDefaultWatermarkPosition();
            redraw();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function resizeCanvas() {
    if (!img.src) return;
    const containerWidth = canvasContainer.offsetWidth;
    const imageAspectRatio = img.width / img.height;
    canvas.width = containerWidth;
    canvas.height = containerWidth / imageAspectRatio;
    redraw();
}

function setDefaultWatermarkPosition() {
    ctx.font = `${watermark.size}px Arial`;
    const textWidth = ctx.measureText(watermark.text).width;
    watermark.x = canvas.width - textWidth - 20;
    watermark.y = canvas.height - 20;
}

function updateWatermark() {
    watermark.text = watermarkText.value;
    watermark.size = parseInt(fontSizeInput.value) || 40;
    watermark.color = fontColorInput.value;
    const opacityValue = parseFloat(opacityInput.value);
    watermark.alpha = isNaN(opacityValue) ? 0.5 : opacityValue / 100;
    watermark.pattern = document.querySelector('input[name="pattern"]:checked').value;
    redraw();
}

function drawWatermark(context, canvasWidth, canvasHeight, wmData) {
    context.fillStyle = wmData.color;
    context.globalAlpha = wmData.alpha;
    context.font = `${wmData.size}px Arial`;
    context.textAlign = 'left';
    context.textBaseline = 'bottom';

    const textWidth = context.measureText(wmData.text).width;

    switch (wmData.pattern) {
        case 'single':
            context.fillText(wmData.text, wmData.x, wmData.y);
            break;
        case 'repeat':
            const spacingX = textWidth * 2;
            const spacingY = wmData.size * 3;
            for (let x = -textWidth; x < canvasWidth + spacingX; x += spacingX) {
                for (let y = 0; y < canvasHeight + spacingY; y += spacingY) {
                    context.fillText(wmData.text, x, y);
                }
            }
            break;
        case 'diagonal':
            context.save();
            const diagonalSpacing = textWidth * 1.5;
            context.translate(canvasWidth / 2, canvasHeight / 2);
            context.rotate(-0.785); // -45 degrees
            context.translate(-canvasWidth * 1.5, -canvasHeight * 1.5);
            for (let x = 0; x < canvasWidth * 3; x += diagonalSpacing) {
                for (let y = 0; y < canvasHeight * 3; y += wmData.size * 4) {
                    context.fillText(wmData.text, x, y);
                }
            }
            context.restore();
            break;
    }
}

function redraw() {
    if (!img.src) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawWatermark(ctx, canvas.width, canvas.height, watermark);
    ctx.globalAlpha = 1.0;
}

function startDrag(e) {
    if (watermark.pattern !== 'single') return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const textWidth = ctx.measureText(watermark.text).width;
    if (x >= watermark.x && x <= watermark.x + textWidth && y <= watermark.y && y >= watermark.y - watermark.size) {
        dragging = true;
        dragStartX = x - watermark.x;
        dragStartY = y - watermark.y;
    }
}

function drag(e) {
    if (dragging) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        watermark.x = x - dragStartX;
        watermark.y = y - dragStartY;
        redraw();
    }
}

function stopDrag() {
    dragging = false;
}

function downloadImage() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    tempCtx.drawImage(img, 0, 0);

    const scale = img.width / canvas.width;
    const scaledWmData = {
        ...watermark,
        size: watermark.size * scale,
        x: watermark.x * scale,
        y: watermark.y * scale,
    };

    drawWatermark(tempCtx, tempCanvas.width, tempCanvas.height, scaledWmData);

    const link = document.createElement('a');
    link.download = 'watermarked-image.png';
    link.href = tempCanvas.toDataURL();
    link.click();
}
