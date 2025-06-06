window.onload = function(){
    $("#market_name").val(getParameter("to"));

    if(isMobile()){
        $(".cartTable .round").html("모서리라운딩");
        $("#cartList").append($("#listSampleTr").html());
    }else{
        for(var i=0; i<7; i++){
            $("#cartList").append($("#listSampleTr").html());
        }
    }
    
    $("#all_delete_cart").on('click', function(){
        $("#cartList").html("");
    })
    
    $("#add_cart").on('click', function(){
        $("#cartList").append($("#listSampleTr").html());
        
        var el = document.getElementById('cartList');
        el.scrollTop = el.scrollHeight;
    })
    
    $("#select_delete_cart").on('click', function(){
        $("#cartList tr").each(function(idx, el){
            if($(el).find('.chk input').prop('checked')){
                $(this).remove()
            }
        })
    })
    
    $("#sendMail").on('click', function(){
        vaild();
    });

    $("#psnlAdd").on('click', function(){
        fn_layerPop($("#psnlPopup"));
    });
 
}

var vl = [230,256,328,492,820,132,164]
var vl2 = [477,801]

function fn_set1(me){
    var tr = $(me).parents('tr');
    var width = $(tr).find("[name='exWidth']").val();
    var height = $(tr).find("[name='exHeight']").val();

    if(width > 2400 || height > 2400){            
        fn_layerPop($("#alertPopup"), "최대 사이즈는 2400mm입니다.");
        $(me).val(2400);
        return;
    }
    if(width > 1200 && height > 1200){            
        fn_layerPop($("#alertPopup"), "최대 사이즈는 1200x2400mm입니다.");
        $(me).val(1200);
        return;
    }
}

function fn_set2(me){
    $(me).val(format_onlyNum($(me).val()));
    getAt(me);
}

function fn_set3(me){
    getAt(me);
}

function fn_set4(me){
    if($(me).val() != ""){
        var td = $(me).parents('td');
        $(td).find("[name='holeSize']").attr('disabled', false);
        $(td).find("[name='exholeWay']").attr('disabled', false);
    }
}

function getAt(me){
    var tr = $(me).parents('tr');
    var s1 = Number($(tr).find("[name='exWidth']").val()) + 10 ;
    var s2 = Number($(tr).find("[name='exHeight']").val()) + 10;
    var c = Number($(tr).find("[name='exCnt']").val()) ;

    if($(tr).find("[name='thickness']").val() == "" 
    || $(tr).find("[name='exWidth']").val() < 1 || s1 < 1 || s2 < 1 || c < 1 ){
        $(tr).find("[name='exAmt']").html(0);
        return;
    }
    
    var h = ((s1) * (s2) / 9000);
    var a;

    if($("#act").val() == "T"){
        a = vl[$(tr).find("[name='thickness']").val()] * h;
    }else if($("#act").val() == "C"){
        a = vl2[$(tr).find("[name='thickness']").val()] * h;
    }

    if($(tr).find("[name='type']").val() == "1"){
        a = a + (h * 325);
    }

    if($(tr).find("[name='hole']").val() != ""){
        a = a + 1000;
    }

    if($(tr).find("[name='round']").val() != ""){
        a = a + 1000;
    }

    a = Math.ceil(a/100) * c;    
    $(tr).find("[name='exAmt']").html(format_num(a*100));
    sumVal()
}

function sumVal(){
    var sum = 0;
    var cntsum = 0;
    $("#cartList tr").each(function(i, me) {
        cntsum += Number(removeFormat_num($(me).find("[name='exCnt']").val()));
        sum += Number(removeFormat_num($(me).find("[name='exAmt']").text()));
    });

    $("#tot_count").html(format_num(cntsum));
    $("#tot_amtcount").html(format_num(sum/100));
    $("#tot_amt").html(format_num(sum));
}

function vaild(){
    var tf = true;
    var txt = "주문하시려는 제품이 없습니다.";
    
    $('#cartList tr').each(function(index){
        if($.trim($(this).find('[name="type"]').val()) == "" ){
            txt = "재단/인쇄 종류를 선택 해주세요.";
            return;            
        }

        if($.trim($(this).find('[name="exAmt"]').text()) != "0" ){
            if($.trim($(this).find('[name="hole"]').val()) != "" ){
                if($.trim($(this).find('[name="holeSize"]').val()) == "" ){
                    txt = "타공의 크기를 선택해주세요.";
                    return;            
                }
                if($.trim($(this).find('[name="exholeWay"]').val()) == "" ){
                    txt = "타공중심거리를 입력하세요.";
                    return;            
                }
                tf=false;
            }else{
                tf=false;
            }
        }
    })

    if(tf){        
        fn_layerPop($("#alertPopup"), txt);
        return;
    }
    
    if($('#order_name').val() == ""){
        fn_layerPop($("#alertPopup"), "주문자의 성함을 적어주세요.");
        return;
    }
    
    if($('#order_tel').val() == ""){
        fn_layerPop($("#alertPopup"), "주문자의 연락처를 적어주세요.");
        return;
    }
    
    if(!$("#chkAgree").prop('checked')){
        fn_layerPop($("#alertPopup"), "개인정보 취급방침을 동의합니다.");
        return;
    }

    save_img()
}


function save_img(){
    var html = "";

    $('#cartList tr').each(function(index){
        if($.trim($(this).find('[name="exAmt"]').text()) != "0" ){
            html += '<tr style=" border-bottom: 2px solid #BDBDBD; height: 60px;">';
            html += '	<td style="border-right: 1px solid #BDBDBD;">' + $(this).find('[name="type"] option:selected').text() + '</td>';

            if($(this).find('[name="color"]').length > 0){
                html += '	<td style="border-right: 1px solid #BDBDBD;">' + $(this).find('[name="color"] option:selected').text() + '</td>';
            }else{
                html += '	<td style="border-right: 1px solid #BDBDBD;">투명</td>';
            }

            html += '	<td style="border-right: 1px solid #BDBDBD;">' + $(this).find('[name="exWidth"]').val() + 'x'+ $(this).find('[name="exHeight"]').val() + 'x'+ $(this).find('[name="thickness"] option:selected').text() + '</td>';

            html += '	<td style="border-right: 1px solid #BDBDBD;">' + $(this).find('[name="hole"] option:selected').text();

            if("없음" != $(this).find('[name="hole"] option:selected').text()){
                html += "/" + $.trim($(this).find('[name="holeSize"]').val());
                html += "/" + $.trim($(this).find('[name="exholeWay"]').val());
            }

            html += '</td>';
            html += '	<td style="border-right: 1px solid #BDBDBD;">' + $(this).find('[name="round"] option:selected').text() + '</td>';
            html += '	<td style="border-right: 1px solid #BDBDBD;">' + $(this).find('[name="exCnt"]').val() + '</td>';
            html += '</tr>';    
        }
    });

    $('#saveImgForm ._cartList').html(html);

    var dt = new Date();
    var fileNm = "아크릴 재단 견적서";
    
    fileNm = fileNm + dt.toLocaleDateString().replace(/\./gi, '').replace(/\ /gi, '');
    fileNm = fileNm + dt.toTimeString().split(' ')[0].replace(/\:/g, '');

    $("._name").html($('#order_name').val());
    $("._tel").html($('#order_tel').val());
    $("._market").html($('#market_name').val());


    $("#_tot_count").html($("#tot_count").html());
    $("#_tot_amtcount").html($("#tot_amtcount").html());
    $("#_tot_amt").html($("#tot_amt").html());

    fn_downloadImg('saveImgForm', fileNm);
    send_email();
}

// 이메일 보내기
function send_email(){	
    $('#send_amt').val($('#tot_amt').text());
    $('#send_amtcount').val($('#tot_amtcount').text());
    $('#send_count').val($('#tot_count').text());
    
    var cartTxt = "";
    
    $('#saveImgForm ._cartList tr').each(function(index){
        if(index != 0){
            cartTxt += "/"
        }
        $(this).find('td').each(function(index){
            cartTxt += $(this).text() + "|";
        });
    });
    
    $('#cart').val(cartTxt);

    var queryString = $("form[name=emailfrm]").serialize() ;

    $("#loadingPopup").show();
    $.ajax({
        data : queryString,
        type : 'post',
        url : 'https://script.google.com/macros/s/AKfycbz_cKFyNM9pwhGlUkBLC9zgfdBB2c6SpoNskTAWutFtw1ZkJyqpLhY_k-5HdL-pS8L6/exec',
        dataType : 'json',
        error: function(xhr, status, error){
            fn_layerPop($("#layer_alert"), error);
        },
        success : function(result){
            $("#loadingPopup").hide();
            if(result.result == "error"){
                fn_layerPop($("#alertPopup"), result.error.message);		
            }else{
                fn_callBackSendEmail();
            }
        }
    });
}


function fn_callBackSendEmail(){
$("._payOpt").text($("#tot_amtcount").text());
fn_layerPop($("#payPopup"));
}
