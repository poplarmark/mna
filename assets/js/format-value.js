<script>
$(document).on("keypress", ".format-value", function (e) {
  let charCode = (e.which) ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
});
$(document).on('keyup', '.format-value', function (e) {
  let val = this.value;
  val = val.replace(/,/g, "");
  if (val.length > 3) {
    let noCommas = Math.ceil(val.length / 3) - 1;
    let remain = val.length - (noCommas * 3);
    let newVal = [];
    for (let i = 0; i < noCommas; i++) {
      newVal.unshift(val.substr(val.length - (i * 3) - 3, 3));
    }
    newVal.unshift(val.substr(0, remain));
    this.value = newVal;
  }
  else {
    this.value = val;
  }
});

Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

$(document).ready( function() {
  $('#input__date').val(new Date().toDateInputValue());
});​
</script>