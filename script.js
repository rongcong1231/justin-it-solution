document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".main-nav");
  if(menu) menu.addEventListener("click",()=>nav.classList.toggle("open"));

  const langBtns=document.querySelectorAll(".lang-btn");
  const applyLang=(lang)=>{
    document.documentElement.lang=lang==="cn"?"zh-CN":"en";
    document.querySelectorAll("[data-en][data-cn]").forEach(el=>{
      el.innerHTML=lang==="cn"?el.dataset.cn:el.dataset.en;
    });
    langBtns.forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
    localStorage.setItem("jit-lang",lang);
  };
  langBtns.forEach(b=>b.addEventListener("click",()=>applyLang(b.dataset.lang)));
  applyLang(localStorage.getItem("jit-lang")||"en");

  document.querySelectorAll(".filter").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const bar=btn.closest(".filter-bar");
      if(!bar) return;
      bar.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
      btn.classList.add("active");
      const f=btn.dataset.filter;
      const productGrid=bar.parentElement.querySelector(".product-grid");
      const detailGrid=bar.parentElement.querySelector(".detail-grid");
      if(productGrid){
        productGrid.querySelectorAll(".product-card").forEach(card=>{
          card.style.display=(f==="all"||card.dataset.category===f)?"block":"none";
        });
      }
      if(detailGrid){
        detailGrid.querySelectorAll(".detail-card").forEach(card=>{
          card.style.display=(f==="all"||card.dataset.category===f)?"block":"none";
        });
      }
    });
  });

  const form=document.getElementById("quoteForm");
  if(form){
    const params=new URLSearchParams(location.search), item=params.get("item");
    if(item) {
      const messageField=document.getElementById("qMessage");
      messageField.value=`I would like to enquire about: ${item}\n\nMy requirements: `;
      const choice=document.getElementById("qService");
      const candidates=[...choice.options];
      const normal=x=>x.toLowerCase().replace(/[^a-z0-9]/g," ");
      const target=normal(item);
      let match=candidates.find(o=>normal(o.value)===target);
      if(!match) match=candidates.find(o=>target.includes(normal(o.value))||normal(o.value).includes(target));
      if(match) choice.value=match.value;
    }
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const name=document.getElementById("qName").value.trim();
      const phone=document.getElementById("qPhone").value.trim();
      const service=document.getElementById("qService").value;
      const msg=document.getElementById("qMessage").value.trim();
      const area=document.getElementById("qArea")?.value.trim()||"Not specified";
      const budget=document.getElementById("qBudget")?.value||"Not specified";
      const details=[
        "Hi JUSTIN IT SOLUTION, I would like to request a quotation.",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        `Location: ${area}`,
        `Approximate budget: ${budget}`,
        `Requirements: ${msg||"Please advise."}`
      ].join("\n");
      window.open(`https://wa.me/60122935434?text=${encodeURIComponent(details)}`,"_blank","noopener,noreferrer");
    });
  }

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
});
