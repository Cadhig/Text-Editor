(()=>{const t=document.getElementById("buttonInstall");let n=null;window.addEventListener("beforeinstallprompt",(t=>{t.preventDefault(),n=t})),t.addEventListener("click",(async()=>{if(!n)return;const t=await n.prompt();console.log(`Install prompt was: ${t.outcome}`),n=null})),window.addEventListener("appinstalled",(t=>{n=null}))})();