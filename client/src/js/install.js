const butInstall = document.getElementById('buttonInstall');
let installPrompt = null

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    installPrompt = event
});

butInstall.addEventListener('click', async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    installPrompt = null
});

window.addEventListener('appinstalled', (event) => {
    installPrompt = null
});
