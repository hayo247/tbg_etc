
function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURI(decodeURIComponent(results[1].replace(/\+/g, " ")));
}

// 숫자만
function format_onlyNum(num){
	return num.toString().replace(/[^-0-9]/g,'');
}

// 전화 포맷
function format_phonnum(num){
	return num.toString().replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
}

// 숫자 포맷
function format_num(num){
	const parts = num.toString().split('.');
  	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  	return parts.join('.');
}

// 숫자 포맷
function removeFormat_num(num){
	return num.toString().replace(/\,/g, "");
}

function fn_layerPop(el, txt, focusEl){
	$("#pLayerTxt").text(txt);
	$(el).show();
	
	$(el).find('button.btn_close').click(function(){
		$(el).hide();
		
		if($(focusEl)){$(focusEl).focus();}
		return false;
	});
}

function fn_downloadImg(obj, nm){
	html2canvas($('#' + obj)[0]).then(function(canvas){
		var img = document.createElement("a");
		img.target = '_blank';
		img.crossOrigin = 'Anonymous';
		img.download = nm + ".png";
		img.href=canvas.toDataURL();
		document.body.appendChild(img);
		img.click();
		img.remove();
	});
}


function fn_downloadImg2(obj, nm){
	html2canvas($('#' + obj)[0]).then(function(canvas){
        canvas.toBlob((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              const fileName = nm + '.png';
            
              a.href = url;
              a.download = fileName;
              document.body.appendChild(a);            

			  a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
		});
	});
}

function isMobile(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
