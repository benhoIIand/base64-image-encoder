var doc = document,
    form = doc.getElementById('file'),
    cssBox = doc.getElementById('css_box'),
    htmlBox = doc.getElementById('html_box'),
    dropArea = doc.getElementById('drop_area');

dropArea.onclick = function() {
    form.click();
};

dropArea.ondragover = function() {
    this.className = 'hover';
    return false;
};
dropArea.ondragend = function() {
    this.className = '';
    return false;
};
dropArea.ondrop = function(e) {
    this.className = '';
    e.preventDefault();

    var file = e.dataTransfer.files[0],
        reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function(e) {
        showEncodedImage(e.target.result);
        setBackgroundImage(e.target.result);
    };

    return false;
};

form.onchange = function(e) {
    var file = form.files[0],
        reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function(e) {
        showEncodedImage(e.target.result);
        setBackgroundImage(e.target.result);
    };
};

var setBackgroundImage = function(code) {
    dropArea.style.background = 'url(' + code + ') no-repeat center';
};

var showEncodedImage = function(code) {
    cssBox.innerHTML = "background-image: url('" + code + "');";
    htmlBox.innerHTML = '<img src="' + code + '" />';
};

var copyToClipboard = function(text) {
    copied = text.createTextRange();
    copied.execCommand("Copy");
};