<div id="log-output" style="font-family: monospace; white-space: pre-line;"></div>

<script>
    const output = document.getElementById('log-output');
    const es = new EventSource('stream-jadwal-log');
    es.onmessage = function (e) {
        output.textContent += e.data + '\n';
        output.scrollTop = output.scrollHeight;
    };
    es.onerror = function () {
        es.close();
        output.textContent += "\n🔴 Koneksi terputus.\n";
    };
</script>
