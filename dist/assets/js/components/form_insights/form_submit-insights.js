<script>
var Webflow=Webflow||[];Webflow.push((function(){$(document).off("submit"),$("#form_insights").submit((function(i){i.preventDefault();const t=$(this),a=$("[type=submit]",t),o=a.val(),e=a.attr("data-wait"),s=t.attr("method"),n=t.attr("action"),l=t.attr("data-redirect"),f=t.serialize();e&&a.val(e),$.ajax(n,{data:f,method:s}).done((i=>{l?window.location=l:t.hide().siblings(".w-form-done").show().siblings(".w-form-fail").hide()})).fail((i=>{t.siblings(".w-form-done").hide().siblings(".w-form-fail").show()})).always((()=>{a.val(o)}))}))}));
//# sourceMappingURL=form_submit-insights.js.map
</script>