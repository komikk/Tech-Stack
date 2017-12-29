var app = document.getElementById('app');
var time = document.getElementById('time');

var timer = setInterval(updateClock, 1000);

function updateClock() {
    time.innerHTML = (new Date()).toString();
}

// Edit these styles to see them take effect immediately
app.style.display = 'table-cell';
app.style.width = '500px';
app.style.height = '200px';
app.style.border = '10px solid #339';
app.style.background = '#99d';
app.style.color = '#333';
app.style.textAlign = 'center';
app.style.verticalAlign = 'middle';

// Uncomment one of the following lines to see error handling
// require('unknown-module')
// } syntax-error

if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(function () {
        clearInterval(timer);
    });
}


