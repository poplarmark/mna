<script>
const phone__indication=document.getElementById("valuation_input-phone");function autoFormatPhoneNumber(t){try{var n=(""+t).replace(/\D/g,"").match(/^(1|)?(\d{0,3})?(\d{0,3})?(\d{0,4})?$/);return[n[1]?"+1 ":"",n[2]?"(":"",n[2],n[3]?") ":"",n[3],n[4]?"-":"",n[4]].join("")}catch(t){return""}}phone__indication.oninput=t=>{t.target.value=autoFormatPhoneNumber(t.target.value)};const phone__contact=document.getElementById("contact-us_input-phone");function autoFormatPhoneNumber(t){try{var n=(""+t).replace(/\D/g,"").match(/^(1|)?(\d{0,3})?(\d{0,3})?(\d{0,4})?$/);return[n[1]?"+1 ":"",n[2]?"(":"",n[2],n[3]?") ":"",n[3],n[4]?"-":"",n[4]].join("")}catch(t){return""}}phone__contact.oninput=t=>{t.target.value=autoFormatPhoneNumber(t.target.value)};
//# sourceMappingURL=format-phone_page-mna.js.map
</script>