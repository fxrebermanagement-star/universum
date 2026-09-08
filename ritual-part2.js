function paintPlan(){
  const d=load();
  const sel=$("#plR");
  if(sel && sel.options.length!==R.length){
    sel.innerHTML="";
    R.forEach(r=>{const o=document.createElement("option"); o.value=r.id; o.textContent=r.t; sel.appendChild(o);});
  }
  const box=$("#plList"); if(!box) return;
  box.innerHTML=d.planned.length?d.planned.map(x=>`<div class="entry"><b>${esc(x.titel)}</b><small style="display:block">Für: ${esc(x.wer||"—")}</small><div class="meta">${esc(x.t||"")}</div><div class="mini"><button type="button" class="btn primary" data-go="${x.pid}">Setzen</button><button type="button" class="btn ghost" data-del="${x.pid}">Streichen</button></div></div>`).join(""):"<p class='sub'>Nichts geplant.</p>";
  $$("#plList [data-go]").forEach(b=>b.onclick=()=>{ const x=load().planned.find(p=>p.pid===b.dataset.go); if(!x) return; fromPlan=x.pid; openR(x.id, x.wer); });
  $$("#plList [data-del]").forEach(b=>b.onclick=()=>{ const d=load(); d.planned=d.planned.filter(p=>p.pid!==b.dataset.del); save(d); paintPlan(); });
}
function installPwa(){ try{ if(location.protocol==="https:" && "serviceWorker" in navigator){ navigator.serviceWorker.register("ritual-sw.js").catch(()=>{}); } }catch(e){} }
installPwa();
