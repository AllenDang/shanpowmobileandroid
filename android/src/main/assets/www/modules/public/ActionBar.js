/*TMODJS:{"debug":true,"version":42,"md5":"53b29cc0679395983dc3c6df7d70a259"}*/
template("public/ActionBar", '<div class="actionbar row-fluid">\n  <div class="actionbar-section left-button pull-left">\n    <div class="slide-menu"><div class="glyphicons show_lines"></div></div>\n    <div class="back"><div class="glyphicons chevron-left"></div></div>\n  </div>\n  <div class="actionbar-section center pull-left">\n    <div class="page-title pull-left"></div>\n    <div class="btn-group pull-left channel">\n      <a class="btn btn-link dropdown-toggle" data-toggle="dropdown" href="#">\n        <img src="public/img/Crown.png" alt="" class="current-channel">\n        <span class="caret"></span>\n      </a>\n      <ul class="dropdown-menu">\n        <li><a href="?ch=m"><img src="public/img/Crown.png" alt=""><span>男生频道</span></a></li>\n        <li><a href="?ch=f"><img src="public/img/Crown_Woman.png" alt=""><span>女生频道</span></a></li>\n      </ul>\n    </div>\n  </div>\n  <div class="actionbar-section right-button pull-right">\n    <div class="buttons">\n      <div class="button hide glyphicons search"></div>\n    </div>\n  </div>\n</div>\n<div class="spinner"></div>');