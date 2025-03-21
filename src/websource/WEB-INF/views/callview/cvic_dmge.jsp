<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>생산설비 고장신고</title>
<script type="text/javascript" src="../../loader.js"></script>
<script
  src="https://code.jquery.com/jquery-3.4.1.js"
  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  crossorigin="anonymous"></script>
<script
  src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"
  integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30="
  crossorigin="anonymous"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.css" rel="stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.js"></script>


<script>
var api_url = _global.api_host_info;
	$(document).ready(function(){

		if(!sessionStorage.getItem('accepted')){
			location.href="../mobile/login.do?param={}"
		}
		var	obj = new Object()
		;
		obj.hqof_idcd = sessionStorage.getItem('hq_id');
		var jsonData = JSON.stringify(obj);
		var url = api_url+"/system/mobile/get/cvic.do";
		$.ajax({
			url: url,
			data:{param:jsonData},
			type:"post",
			dataType : 'json',
			async    : false,
			success:function(data){
				for (var i = 0; i < data.records.length; i++) {
					$('#cvic_idcd').append('<option value ='+data.records[i].cvic_idcd+'>'+data.records[i].cvic_name+'</option>');
				}
			}
		});
		var url2 = api_url+"/system/mobile/get/user.do";
		var source;
		$.ajax({
			url: url2,
			data:{param:jsonData},
			type:"post",
			dataType : 'json',
			async    : false,
			success:function(data){
				source = $.map(data.records, function(item,idx) {
					return{
						label : item.user_name,
						value : item.user_name,
						text  : item.user_idcd
					}
				})
			}
		});
		$("#rept_aman_name").autocomplete({
			source : source,
			select : function(event, ui) {
// 				$("#user_idcd").val(ui.item.text);
			},
			focus : function(event, ui) {    //포커스 가면
				return false;//한글 에러 잡기용도로 사용됨
			},
			minLength: 1,// 최소 글자수
			autoFocus: true, //첫번째 항목 자동 포커스 기본값 false
			classes: {
				"ui-autocomplete": "highlight"
			},
			delay: 500,    //검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
			position: { my : "right top", at: "right bottom" },
			close : function(event){    //자동완성창 닫아질때 호출
			}
		});
// 		$('#dmge_dttm').datetimepicker({
// 			lang:'ko',
// 			format:'Y-m-d H:i'
// 		});

	});

	 function fileClick(){
		$('#camFile').click();
	}

	$.fn.serializeObject = function(){
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

</script>
<style>
	.container{
		width:100%;
	}
	.camera{
		background-image: url('https://image.flaticon.com/icons/svg/482/482887.svg');
		width: 100%;
		height: 150px;
		background-size: 100% 150px;
		border : 0px;
	}
	#camFile{
		display:none;
	}
	.camimg{
		width: 100%;
		height : 800px;
	}
	.text1{
		width : 80%;
		height : 100px;
		font-size : 3em;
		border:1px solid;
	}
	.text1_label{
		width:18%;
		height:100px;
		font-size : 3em;
		text-align: center;
	}
	.text{
		padding : 3px;
	}
	.button{
		width : 100%;
		height : 100px;
		font-size:3em;
	}

	select{
		background-color: white;
	}
	#ui-id-1{
		font-size:3em;
	}
	.xdsoft_noselect{
		width: 70%;
	}
	.xdsoft_datetimepicker .xdsoft_datepicker{
		width: 65%;
	}
	.xdsoft_datetimepicker .xdsoft_timepicker{
		width: 30%;
	}
	.xdsoft_datetimepicker .xdsoft_calendar td, .xdsoft_datetimepicker .xdsoft_calendar th{
		font-size: 2em;
	}
	.xdsoft_datetimepicker .xdsoft_label{
		font-size: 2em;
	}
	.xdsoft_datetimepicker .xdsoft_timepicker .xdsoft_time_box >div >div{
		font-size: 2em;
	}
	.xdsoft_datetimepicker .xdsoft_timepicker .xdsoft_time_box{
		height: 200px;
	}
</style>
</head>
<body>
<jsp:include page="header.jsp"></jsp:include>
<div class="container">
	<form action="../upload/set/fileUpload.do" method="post" id="frm" enctype="multipart/form-data">
	<div class="row">
		<div class = "col-md-6">
			<img alt="" src="" onerror="this.src='https://www.missioninfra.net/img/noimg/noimg_4x3.gif'" id="camimg" class="camimg">
		</div>
		<div class="col-md-6">
			<input type="file" accept="image/*" capture="camera" id="camFile">
			<input type="button" onclick="fileClick()" class="camera"></button>
		</div>
		<script>
			var camera = document.getElementById('camFile');
			camera.addEventListener('change',function(e){
				var file = e.target.files[0];
				var img = document.getElementById('camimg');
				img.src = URL.createObjectURL(file);
			});
		</script>
		<div class = "col-md-3 text">
		</div>
		<div class = "col-md-3 text">
			<label class="text1_label">설비명</label>
			<select name = "cvic_idcd"  id="cvic_idcd" class="text1">
			</select>
		</div>
		<div class = "col-md-3 text">
			<label class="text1_label">고장코드</label>
			<select name='file_dvcd_1fst' class ="text1" id="dmge_dvcd">
			</select>
		</div>
		<div class = "col-md-3 text">
			<label class="text1_label">고장일시</label>
			<input type="text" id="dmge_dttm" name = "dmge_dttm" class="text1">
		</div>
		<script>
			$('#dmge_dttm').datetimepicker({
				lang:'ko',
				format:'Y-m-d H:i'
			});
		</script>
		<div class = "col-md-3 text">
			<label class="text1_label">고장부위</label>
			<input type="text" name = "dmge_regn" class="text1">
		</div>
		<div class = "col-md-3 text">
			<label class="text1_label">보고자명</label>
			<input name = "rept_aman_name" id="rept_aman_name" class="text1">
<!-- 			<input type="hidden" name = "user_idcd" id="user_idcd" class="text1"> -->
		</div>
		<div class = "col-md-3 text">
			<input type="hidden" name="orgn_dvcd" value="cvic_dmge">
			<input type="hidden" name="assi_seqn" value="0" id="assi_seqn">
			<input type="hidden" name="hqof_idcd" value="" id="hqof_idcd">
			<input type="hidden" name="line_seqn" value="0" id="line_seqn">
			<input type="hidden" name = "invc_numb" id ="invc_numb" >
		</div>
		<div class = "col-sm col-md-6 buttonDiv">
			<div class = "col-sm-6 col-md-6 ">
				<button type="button" onclick="frm()" class="button btn btn-primary" id="btn-one">저장</button>
			</div>
			<script>
				function frm(){

					var	invc_numb = $('#cvic_idcd option:selected').val(),
						a = JSON.stringify({
							invc_numb		: invc_numb,													//invc_numb와 orgn_dvcd(테이블명)이 필요하다.
							orgn_dvcd		: 'cvic_dmge',
							line_seqn		: 0,
							hqof_idcd		: sessionStorage.getItem('hq_id'),
						})
					;

					$('#invc_numb').val(invc_numb);
					var cam = document.getElementById('camFile');
					if(cam.files[0]){
						$('#btn-one').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
						$('#hqof_idcd').val(sessionStorage.getItem("hq_id"));
						$.ajax({
							url: api_url+'/system/mobile/get/getfileseqn.do',
							data: {param:a},
							dataType:'json',
							async: false,
							type:"post",
							success:function(data){
								$('#assi_seqn').val(data.records[0].assi_seqn+1);
							}
						});
						var data = new FormData();
				 			data.append('files',cam.files[0]);
							data.append('param',JSON.stringify($('#frm').serializeObject()));
						$.ajax({
							url: api_url+'/system/mobile/set/fileUpload.do',
							data : data,
							processData: false,
							contentType: false,
							type:"post",
							enctype:'multipart/form-data',
							success:function(data){
								var json = JSON.parse(data);
								if(json.success){
									alert('저장완료');
									location.href="../mobile/login.do?param={}";
								}else{
									alert('이미지 저장실패');
								}

							}
						});
						$.ajax({
							url: api_url+'/system/mobile/cvicdmge/set/cvicdmge.do',
							data : {param:JSON.stringify($('#frm').serializeObject())},
							dataType:'json',
							async: false,
							type:"post",
							success:function(data){
							}
						});
					}else{
						alert('사진을 선택해주세요');
						return;
					}
				}
			</script>
			<div class = "col-sm-6 col-md-6 ">
				<input type="reset"  value="다시쓰기" class="button btn btn-primary">
			</div>
		</div>
	</div>
	</form>
</div>
</body>
</html>