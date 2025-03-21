<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>생산현장 사진등록</title>
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
		var url = api_url+"/system/mobile/get/pjod.do";//tastCall에 있음
		$.ajax({
			url: url,
			data:{param:jsonData},
			type:"post",
			dataType : 'json',
			async    : false,
			success:function(data){
				for (var i = 0; i < data.records.length; i++) {
					$('#pjod_idcd').append('<option value ='+data.records[i].pjod_idcd+'>'+data.records[i].pjod_idcd+'</option>');
				}
			}
		});
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
		margin-top:14px;
	}
	.button{
		width : 100%;
		height : 100px;
		font-size:3em;
	}
	.buttonDiv{
		margin-top: 10%;
	}
	select{
		background-color: white;
	}
</style>
</head>
<body>
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
			<label class="text1_label">금형번호</label>
			<select name = "invc_numb"  id="pjod_idcd" class="text1">
			</select>
		</div>
		<div class = "col-md-3 text">
			<label class="text1_label">파일제목</label>
			<input type="text" name = "file_ttle" class="text1">
		</div>
		<div class = "col-md-3 text">
			<label class="text1_label">분류</label>
			<select name='file_dvcd_1fst' class ="text1" id="file_dvcd_1fst">
			</select>
		</div>
		<div class = "col-md-3 text">
			<input type="hidden" name="orgn_dvcd" value="pjod_mast">
			<input type="hidden" name="assi_seqn" value="0" id="assi_seqn">
			<input type="hidden" name="hqof_idcd" value="" id="hqof_idcd">
			<input type="hidden" name="line_seqn" value="0" id="line_seqn">
		</div>
		<div class = "col-sm col-md-6 buttonDiv">
			<div class = "col-sm-6 col-md-6 ">
				<input type="button" onclick="frm()" value="저장" class="button btn btn-primary">
			</div>
			<script>
				function frm(){
					var	invc_numb = $('#pjod_idcd option:selected').val(),
						a = JSON.stringify({
						invc_numb		: invc_numb,													//invc_numb와 orgn_dvcd(테이블명)이 필요하다.
						orgn_dvcd		: 'pjod_mast',
						line_seqn		: 0,
						hqof_idcd		: sessionStorage.getItem('hq_id'),
					})
					;
					var cam = document.getElementById('camFile');
					if(cam.files[0]){
						$('#hqof_idcd').val(sessionStorage.getItem("hq_id"));
						$.ajax({
							url: api_url+'/system/mobile/get/getfileseqn.do',
							data: {param:a},
							dataType:'json',
							async: false,
							type:"post",
							success:function(data){
								console.log(data.records[0]);
								$('#assi_seqn').val(data.records[0].assi_seqn+1);
							}
						});
						var data = new FormData();
				 		data.append('files',cam.files[0]);
						data.append('param',JSON.stringify($('#frm').serializeObject()));
						console.log(JSON.stringify($('#frm').serializeObject()));
						$.ajax({
							url: api_url+'/system/mobile/set/fileUpload.do',	//tastCall에 있음
							data:data,
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
									alert('저장실패');
								}

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