document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();
    
    var url = formData.get('url');
    var format = formData.get('format');
    var quality = formData.get('quality');

    xhr.open('POST', 'download.py', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    document.getElementById('progress').style.display = 'none';
                    document.getElementById('downloadLink').style.display = 'block';
                    var downloadLink = document.getElementById('downloadAnchor');
                    downloadLink.setAttribute('href', response.download_link);
                    downloadLink.innerText = 'Download ' + format.toUpperCase();
                } else {
                    alert('Error: ' + response.error_message);
                }
            } else {
                alert('Error: ' + xhr.statusText);
            }
        }
    };

    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            document.getElementById('progressBar').value = percentComplete;
            document.getElementById('progressStatus').innerText = 'Downloading... ' + percentComplete.toFixed(0) + '%';
        }
    };

    xhr.send(JSON.stringify({ url: url, format: format, quality: quality }));

    document.getElementById('progress').style.display = 'block';
    document.getElementById('downloadLink').style.display = 'none';
});
