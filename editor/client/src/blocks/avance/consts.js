export const
        // Class names
        btnPrimaryClass = 'btn-primary',
        btnSuccessClass = 'btn-success',
        btnDangerClass = 'btn-danger',
        btnInfoClass = 'btn-info',
        btnWarningClass = 'btn-warning',
        btnDefaultClass = 'btn-default',

        btnLgClass = 'btn-lg',
        btnXsClass = 'btn-xs',
        btnSmClass = 'btn-sm',
        
        pbPrimaryClass = '',
        pbSuccessClass = 'progress-bar-success',
        pbDangerClass = 'progress-bar-danger',
        pbInfoClass = 'progress-bar-info',
        pbWarningClass = 'progress-bar-warning',
        
        pbStripedClass = 'progress-bar-striped',
        pbAnimateClass = 'active',

        // Styles
        progressBarStyle = `<style>
progress{ display: inline-block; vertical-align: baseline; }
@-webkit-keyframes progress-bar-stripes {
  from { background-position: 40px 0; }
  to { background-position: 0 0; }
}
@-o-keyframes progress-bar-stripes {
  from { background-position: 40px 0; }
  to { background-position: 0 0; }
}
@keyframes progress-bar-stripes {
  from { background-position: 40px 0; }
  to { background-position: 0 0; }
}
.progress { overflow: hidden; height: 20px; margin-bottom: 20px; background-color: #f5f5f5; border-radius: 4px; -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }
.progress-bar { min-width: 2em; float: left; width: 0%; height: 100%; font-size: 12px; line-height: 20px; color: #ffffff; text-align: center; background-color: #337ab7; -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15); box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15); -webkit-transition: width 0.6s ease; -o-transition: width 0.6s ease; transition: width 0.6s ease; }
.progress-striped .progress-bar,
.progress-bar-striped {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  -webkit-background-size: 40px 40px;
          background-size: 40px 40px;
}
.progress.active .progress-bar,
.progress-bar.active {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
  -o-animation: progress-bar-stripes 2s linear infinite;
  animation: progress-bar-stripes 2s linear infinite;
}
.progress-bar-success {
  background-color: #5cb85c;
}
.progress-striped .progress-bar-success {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-info {
  background-color: #5bc0de;
}
.progress-striped .progress-bar-info {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-warning {
  background-color: #f0ad4e;
}
.progress-striped .progress-bar-warning {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-danger {
  background-color: #d9534f;
}
.progress-striped .progress-bar-danger {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
</style>`,

        btnStyle = `<style>
[data-type="btn"].btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
[data-type="btn"].btn:focus,
[data-type="btn"].btn:active:focus,
[data-type="btn"].btn.active:focus,
[data-type="btn"].btn.focus,
[data-type="btn"].btn:active.focus,
[data-type="btn"].btn.active.focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
[data-type="btn"].btn:hover,
[data-type="btn"].btn:focus,
[data-type="btn"].btn.focus {
  color: #333333;
  text-decoration: none;
}
[data-type="btn"].btn:active,
[data-type="btn"].btn.active {
  outline: 0;
  background-image: none;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
[data-type="btn"].btn.disabled,
[data-type="btn"].btn[disabled],
[data-type="btn"]fieldset[disabled] .btn {
  cursor: not-allowed;
  opacity: 0.65;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
}
[data-type="btn"]a.btn.disabled,
[data-type="btn"]fieldset[disabled] a.btn {
  pointer-events: none;
}
[data-type="btn"].btn-default {
  color: #333333;
  background-color: #ffffff;
  border-color: #cccccc;
}
[data-type="btn"].btn-default:focus,
[data-type="btn"].btn-default.focus {
  color: #333333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
[data-type="btn"].btn-default:hover {
  color: #333333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
[data-type="btn"].btn-default:active,
[data-type="btn"].btn-default.active,
[data-type="btn"].open > .dropdown-toggle.btn-default {
  color: #333333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
[data-type="btn"].btn-default:active:hover,
[data-type="btn"].btn-default.active:hover,
[data-type="btn"].open > .dropdown-toggle.btn-default:hover,
[data-type="btn"].btn-default:active:focus,
[data-type="btn"].btn-default.active:focus,
[data-type="btn"].open > .dropdown-toggle.btn-default:focus,
[data-type="btn"].btn-default:active.focus,
[data-type="btn"].btn-default.active.focus,
[data-type="btn"].open > .dropdown-toggle.btn-default.focus {
  color: #333333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
[data-type="btn"].btn-default:active,
[data-type="btn"].btn-default.active,
[data-type="btn"].open > .dropdown-toggle.btn-default {
  background-image: none;
}
[data-type="btn"].btn-default.disabled:hover,
[data-type="btn"].btn-default[disabled]:hover,
[data-type="btn"]fieldset[disabled] .btn-default:hover,
[data-type="btn"].btn-default.disabled:focus,
[data-type="btn"].btn-default[disabled]:focus,
[data-type="btn"]fieldset[disabled] .btn-default:focus,
[data-type="btn"].btn-default.disabled.focus,
[data-type="btn"].btn-default[disabled].focus,
[data-type="btn"]fieldset[disabled] .btn-default.focus {
  background-color: #ffffff;
  border-color: #cccccc;
}
[data-type="btn"].btn-default .badge {
  color: #ffffff;
  background-color: #333333;
}
[data-type="btn"].btn-primary {
  color: #ffffff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
[data-type="btn"].btn-primary:focus,
[data-type="btn"].btn-primary.focus {
  color: #ffffff;
  background-color: #286090;
  border-color: #122b40;
}
[data-type="btn"].btn-primary:hover {
  color: #ffffff;
  background-color: #286090;
  border-color: #204d74;
}
[data-type="btn"].btn-primary:active,
[data-type="btn"].btn-primary.active,
[data-type="btn"].open > .dropdown-toggle.btn-primary {
  color: #ffffff;
  background-color: #286090;
  border-color: #204d74;
}
[data-type="btn"].btn-primary:active:hover,
[data-type="btn"].btn-primary.active:hover,
[data-type="btn"].open > .dropdown-toggle.btn-primary:hover,
[data-type="btn"].btn-primary:active:focus,
[data-type="btn"].btn-primary.active:focus,
[data-type="btn"].open > .dropdown-toggle.btn-primary:focus,
[data-type="btn"].btn-primary:active.focus,
[data-type="btn"].btn-primary.active.focus,
[data-type="btn"].open > .dropdown-toggle.btn-primary.focus {
  color: #ffffff;
  background-color: #204d74;
  border-color: #122b40;
}
[data-type="btn"].btn-primary:active,
[data-type="btn"].btn-primary.active,
[data-type="btn"].open > .dropdown-toggle.btn-primary {
  background-image: none;
}
[data-type="btn"].btn-primary.disabled:hover,
[data-type="btn"].btn-primary[disabled]:hover,
[data-type="btn"]fieldset[disabled] .btn-primary:hover,
[data-type="btn"].btn-primary.disabled:focus,
[data-type="btn"].btn-primary[disabled]:focus,
[data-type="btn"]fieldset[disabled] .btn-primary:focus,
[data-type="btn"].btn-primary.disabled.focus,
[data-type="btn"].btn-primary[disabled].focus,
[data-type="btn"]fieldset[disabled] .btn-primary.focus {
  background-color: #337ab7;
  border-color: #2e6da4;
}
[data-type="btn"].btn-primary .badge {
  color: #337ab7;
  background-color: #ffffff;
}
[data-type="btn"].btn-success {
  color: #ffffff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
[data-type="btn"].btn-success:focus,
[data-type="btn"].btn-success.focus {
  color: #ffffff;
  background-color: #449d44;
  border-color: #255625;
}
[data-type="btn"].btn-success:hover {
  color: #ffffff;
  background-color: #449d44;
  border-color: #398439;
}
[data-type="btn"].btn-success:active,
[data-type="btn"].btn-success.active,
[data-type="btn"].open > .dropdown-toggle.btn-success {
  color: #ffffff;
  background-color: #449d44;
  border-color: #398439;
}
[data-type="btn"].btn-success:active:hover,
[data-type="btn"].btn-success.active:hover,
[data-type="btn"].open > .dropdown-toggle.btn-success:hover,
[data-type="btn"].btn-success:active:focus,
[data-type="btn"].btn-success.active:focus,
[data-type="btn"].open > .dropdown-toggle.btn-success:focus,
[data-type="btn"].btn-success:active.focus,
[data-type="btn"].btn-success.active.focus,
[data-type="btn"].open > .dropdown-toggle.btn-success.focus {
  color: #ffffff;
  background-color: #398439;
  border-color: #255625;
}
[data-type="btn"].btn-success:active,
[data-type="btn"].btn-success.active,
[data-type="btn"].open > .dropdown-toggle.btn-success {
  background-image: none;
}
[data-type="btn"].btn-success.disabled:hover,
[data-type="btn"].btn-success[disabled]:hover,
[data-type="btn"]fieldset[disabled] .btn-success:hover,
[data-type="btn"].btn-success.disabled:focus,
[data-type="btn"].btn-success[disabled]:focus,
[data-type="btn"]fieldset[disabled] .btn-success:focus,
[data-type="btn"].btn-success.disabled.focus,
[data-type="btn"].btn-success[disabled].focus,
[data-type="btn"]fieldset[disabled] .btn-success.focus {
  background-color: #5cb85c;
  border-color: #4cae4c;
}
[data-type="btn"].btn-success .badge {
  color: #5cb85c;
  background-color: #ffffff;
}
[data-type="btn"].btn-info {
  color: #ffffff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
[data-type="btn"].btn-info:focus,
[data-type="btn"].btn-info.focus {
  color: #ffffff;
  background-color: #31b0d5;
  border-color: #1b6d85;
}
[data-type="btn"].btn-info:hover {
  color: #ffffff;
  background-color: #31b0d5;
  border-color: #269abc;
}
[data-type="btn"].btn-info:active,
[data-type="btn"].btn-info.active,
[data-type="btn"].open > .dropdown-toggle.btn-info {
  color: #ffffff;
  background-color: #31b0d5;
  border-color: #269abc;
}
[data-type="btn"].btn-info:active:hover,
[data-type="btn"].btn-info.active:hover,
[data-type="btn"].open > .dropdown-toggle.btn-info:hover,
[data-type="btn"].btn-info:active:focus,
[data-type="btn"].btn-info.active:focus,
[data-type="btn"].open > .dropdown-toggle.btn-info:focus,
[data-type="btn"].btn-info:active.focus,
[data-type="btn"].btn-info.active.focus,
[data-type="btn"].open > .dropdown-toggle.btn-info.focus {
  color: #ffffff;
  background-color: #269abc;
  border-color: #1b6d85;
}
[data-type="btn"].btn-info:active,
[data-type="btn"].btn-info.active,
[data-type="btn"].open > .dropdown-toggle.btn-info {
  background-image: none;
}
[data-type="btn"].btn-info.disabled:hover,
[data-type="btn"].btn-info[disabled]:hover,
[data-type="btn"]fieldset[disabled] .btn-info:hover,
[data-type="btn"].btn-info.disabled:focus,
[data-type="btn"].btn-info[disabled]:focus,
[data-type="btn"]fieldset[disabled] .btn-info:focus,
[data-type="btn"].btn-info.disabled.focus,
[data-type="btn"].btn-info[disabled].focus,
[data-type="btn"]fieldset[disabled] .btn-info.focus {
  background-color: #5bc0de;
  border-color: #46b8da;
}
[data-type="btn"].btn-info .badge {
  color: #5bc0de;
  background-color: #ffffff;
}
[data-type="btn"].btn-warning {
  color: #ffffff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
[data-type="btn"].btn-warning:focus,
[data-type="btn"].btn-warning.focus {
  color: #ffffff;
  background-color: #ec971f;
  border-color: #985f0d;
}
[data-type="btn"].btn-warning:hover {
  color: #ffffff;
  background-color: #ec971f;
  border-color: #d58512;
}
[data-type="btn"].btn-warning:active,
[data-type="btn"].btn-warning.active,
[data-type="btn"].open > .dropdown-toggle.btn-warning {
  color: #ffffff;
  background-color: #ec971f;
  border-color: #d58512;
}
[data-type="btn"].btn-warning:active:hover,
[data-type="btn"].btn-warning.active:hover,
[data-type="btn"].open > .dropdown-toggle.btn-warning:hover,
[data-type="btn"].btn-warning:active:focus,
[data-type="btn"].btn-warning.active:focus,
[data-type="btn"].open > .dropdown-toggle.btn-warning:focus,
[data-type="btn"].btn-warning:active.focus,
[data-type="btn"].btn-warning.active.focus,
[data-type="btn"].open > .dropdown-toggle.btn-warning.focus {
  color: #ffffff;
  background-color: #d58512;
  border-color: #985f0d;
}
[data-type="btn"].btn-warning:active,
[data-type="btn"].btn-warning.active,
[data-type="btn"].open > .dropdown-toggle.btn-warning {
  background-image: none;
}
[data-type="btn"].btn-warning.disabled:hover,
[data-type="btn"].btn-warning[disabled]:hover,
[data-type="btn"]fieldset[disabled] .btn-warning:hover,
[data-type="btn"].btn-warning.disabled:focus,
[data-type="btn"].btn-warning[disabled]:focus,
[data-type="btn"]fieldset[disabled] .btn-warning:focus,
[data-type="btn"].btn-warning.disabled.focus,
[data-type="btn"].btn-warning[disabled].focus,
[data-type="btn"]fieldset[disabled] .btn-warning.focus {
  background-color: #f0ad4e;
  border-color: #eea236;
}
[data-type="btn"].btn-warning .badge {
  color: #f0ad4e;
  background-color: #ffffff;
}
[data-type="btn"].btn-danger {
  color: #ffffff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
[data-type="btn"].btn-danger:focus,
.btn-danger.focus {
  color: #ffffff;
  background-color: #c9302c;
  border-color: #761c19;
}
[data-type="btn"].btn-danger:hover {
  color: #ffffff;
  background-color: #c9302c;
  border-color: #ac2925;
}
[data-type="btn"].btn-danger:active,
[data-type="btn"].btn-danger.active,
[data-type="btn"].open > .dropdown-toggle.btn-danger {
  color: #ffffff;
  background-color: #c9302c;
  border-color: #ac2925;
}
[data-type="btn"].btn-danger:active:hover,
[data-type="btn"].btn-danger.active:hover,
[data-type="btn"].open > .dropdown-toggle.btn-danger:hover,
[data-type="btn"].btn-danger:active:focus,
[data-type="btn"].btn-danger.active:focus,
[data-type="btn"].open > .dropdown-toggle.btn-danger:focus,
[data-type="btn"].btn-danger:active.focus,
[data-type="btn"].btn-danger.active.focus,
[data-type="btn"].open > .dropdown-toggle.btn-danger.focus {
  color: #ffffff;
  background-color: #ac2925;
  border-color: #761c19;
}
[data-type="btn"].btn-danger:active,
[data-type="btn"].btn-danger.active,
[data-type="btn"].open > .dropdown-toggle.btn-danger {
  background-image: none;
}
[data-type="btn"].btn-danger.disabled:hover,
[data-type="btn"].btn-danger[disabled]:hover,
[data-type="btn"]fieldset[disabled] .btn-danger:hover,
[data-type="btn"].btn-danger.disabled:focus,
[data-type="btn"].btn-danger[disabled]:focus,
[data-type="btn"]fieldset[disabled] .btn-danger:focus,
[data-type="btn"].btn-danger.disabled.focus,
[data-type="btn"].btn-danger[disabled].focus,
[data-type="btn"]fieldset[disabled] .btn-danger.focus {
  background-color: #d9534f;
  border-color: #d43f3a;
}
[data-type="btn"].btn-danger .badge {
  color: #d9534f;
  background-color: #ffffff;
}
[data-type="btn"].btn-link {
  color: #337ab7;
  font-weight: normal;
  border-radius: 0;
}
[data-type="btn"].btn-link,
[data-type="btn"].btn-link:active,
[data-type="btn"].btn-link.active,
[data-type="btn"].btn-link[disabled],
[data-type="btn"]fieldset[disabled] .btn-link {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}
[data-type="btn"].btn-link,
[data-type="btn"].btn-link:hover,
[data-type="btn"].btn-link:focus,
[data-type="btn"].btn-link:active {
  border-color: transparent;
}
[data-type="btn"].btn-link:hover,
[data-type="btn"].btn-link:focus {
  color: #23527c;
  text-decoration: underline;
  background-color: transparent;
}
[data-type="btn"].btn-link[disabled]:hover,
[data-type="btn"]fieldset[disabled] .btn-link:hover,
[data-type="btn"].btn-link[disabled]:focus,
[data-type="btn"]fieldset[disabled] .btn-link:focus {
  color: #777777;
  text-decoration: none;
}
[data-type="btn"].btn-lg {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
[data-type="btn"].btn-sm {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
[data-type="btn"].btn-xs {
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
[data-type="btn"].btn-block {
  display: block;
  width: 100%;
}
[data-type="btn"].btn-block + .btn-block {
  margin-top: 5px;
}
[data-type="btn"]input[type="submit"].btn-block,
[data-type="btn"]input[type="reset"].btn-block,
[data-type="btn"]input[type="button"].btn-block {
  width: 100%;
}
[data-type="btn"].clearfix:before,
[data-type="btn"].clearfix:after {
  content: " ";
  display: table;
}
[data-type="btn"].clearfix:after {
  clear: both;
}
[data-type="btn"].center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
[data-type="btn"].pull-right {
  float: right !important;
}
[data-type="btn"].pull-left {
  float: left !important;
}
[data-type="btn"].hide {
  display: none !important;
}
[data-type="btn"].show {
  display: block !important;
}
[data-type="btn"].invisible {
  visibility: hidden;
}
[data-type="btn"].text-hide {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
[data-type="btn"].hidden {
  display: none !important;
}
[data-type="btn"].affix {
  position: fixed;
}
</style>`;