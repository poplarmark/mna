<script>
var Webflow=Webflow||[];Webflow.push((function(){$(document).off("submit"),$("#form_refer").submit((function(t){t.preventDefault();const a=$(this),i=$("[type=submit]",a),o=i.val(),e=i.attr("data-wait"),s=a.attr("method"),f=a.attr("action"),l=a.attr("data-redirect"),n=a.serialize();e&&i.val(e),$.ajax(f,{data:n,method:s}).done((t=>{l?window.location=l:a.siblings(".w-form-done").show().siblings(".w-form-fail").hide()})).fail((t=>{a.siblings(".w-form-done").hide().siblings(".w-form-fail").show()})).always((()=>{i.val(o)}))}))}));
//# sourceMappingURL=form_submit-refer.js.map
</script>