Ext.define('module.custom.hjsys.sale.order.slorlist1.model.SlorList1Detail2',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'		//invoice 번호
		},{	name: 'amnd_degr'			, type: 'float', defaultValue : 1			//amd차수
		},{	name: 'line_seqn'			, type: 'int'  , defaultValue : 1			//순번
		},{	name: 'uper_seqn'			, type: 'int'  , defaultValue : 1			//순번
		},{	name: 'disp_seqn'			, type: 'int'  , defaultValue : 1			//순번
		},{	name: 'wkct'				, type: 'wkct'			//구분
		},{	name: 'drwg_numb'			, type: 'string'		//도번
			, convert : function(value, field ){
				if(field.data.line_seqn != 1){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'acpt_qntt'			, type: 'float' 		//수주수량
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'orig_invc_numb'		, type: 'string'		//원invoice번호
		},{	name: 'orig_seqn'			, type: 'float'			//원순번
		},{	name: 'orig_invc_qntt'		, type: 'float'			//원invoice수량
		},{	name: 'optn_dvcd'			, type: 'float'			//옵션구분코드
		},{	name: 'optn_psbl_yorn'		, type: 'string', defaultValue : '0'		//옵션가능여부
		},{	name: 'optn_adtn'			, type: 'float'			//옵션추가
		},{	name: 'pric_adpt'			, type: 'float'			//단가적용
		},{	name: 'norm_sale_pric'		, type: 'float'			//정상판매단가
		},{	name: 'sale_stnd_pric'		, type: 'float'			//판매기준단가
		},{	name: 'invc_qntt'			, type: 'float'			//invoice수량
			, convert : function(value, field ){
				if(field.data.line_seqn != 1){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'invc_pric'			, type: 'float'			//invoice단가
		},{	name: 'vatx_incl_yorn'		, type: 'string', defaultValue : '0'		//부가세포함여부
		},{	name: 'vatx_rate'			, type: 'float' , defaultValue : 0			//부가세율
		},{	name: 'sply_amnt'			, type: 'float'			//공급가액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세금액
		},{	name: 'invc_amnt'			, type: 'float'			//invoice금액
		},{	name: 'krwn_amnt'			, type: 'float'			//원화금액
		},{	name: 'krwn_vatx'			, type: 'float'			//원화부가세
		},{	name: 'krwn_ttsm_amnt'		, type: 'float'			//원화합계금액
		},{	name: 'stnd_unit'			, type: 'string'		//기준단위
		},{	name: 'stnd_unit_qntt'		, type: 'float'			//기준단위수량
		},{	name: 'wrhs_idcd'			, type: 'string'		//창고ID
		},{	name: 'dlvy_cstm_idcd'		, type: 'string'		//납품거래처ID
		},{	name: 'deli_date2'			, type: 'string', serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'dlvy_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납품일자
		},{	name: 'dlvy_hhmm'			, type: 'string'		//납품시분
		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'ostt_dvcd'			, type: 'string'		//출고구분코드
		},{	name: 'dsct_qntt'			, type: 'float'			//중단수량
		},{	name: 'dlvy_memo'			, type: 'string'		//배송메모
		},{	name: 'uper_seqn'			, type: 'float'			//상위순번
		},{	name: 'disp_seqn'			, type: 'float'			//표시순번
		},{	name: 'cstm_lott_numb'		, type: 'string'		//고객LOT번호
		},{	name: 'mold_idcd'			, type: 'string'		//금형코드

		},{	name: 'pdsd_yorn'			, type: 'string'		//생산계획여부

		},{	name: 'check'				, type: 'string'		//생산계획여부체크
		},{	name: 'drChk'				, type: 'string'		//도면등록여부체크
		},{	name: 'chk'					, type: 'string'		//품목추가체크
		},{	name: 'drwg_chk'			, type: 'string'		//도면등록체크

		},{	name: 'mprq_qntt'			, type: 'float' 		//원자재소요량
		},{	name: 'mtrl_widh'			, type: 'float' 		//원자재넓이
		},{	name: 'mtrl_tick'			, type: 'float' 		//원자재두께
		},{	name: 'mtrl_leng'			, type: 'float' 		//원자재길이
		},{	name: 'mtrl_ndqt'			, type: 'float' 		//원자재 소요량
		},{	name: 'mtrl_name'			, type: 'string'		//적용원자재
		},{	name: 'item_name'			, type: 'string'		//품명
			, convert : function(value, field ){
				if(field.data.line_seqn != 1){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'item_widh'			, type: 'float' 		//제품넓이
		},{	name: 'item_leng'			, type: 'float' 		//제품길이
		},{	name: 'bcod_numb'			, type: 'string'		//바코드
		},{	name: 'revs_numb'			, type: 'string' , defaultValue : '000'		//revision
			, convert : function(value, field ){
				if(field.data.line_seqn != 1){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'stor_id'				, type: 'string' , defaultValue : _global.stor_id 		//stor_id
		},{	name: 'bzpl_idcd'			, type: 'string' , defaultValue : _global.dflt_bzpl_idcd 		//bzpl_idcd
		},{	name: 'wkct_1'				, type: 'string'	//설계
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_2'				, type: 'string'	//NCT
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_3'				, type: 'string'	//LASER
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_4'				, type: 'string'	//사상
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_5'				, type: 'string'	//드릴
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_6'				, type: 'string'	//C/S
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_7'				, type: 'string'	//TAP
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_8'				, type: 'string'	//절곡1
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_9'				, type: 'string'	//절곡2
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_10'				, type: 'string'	//용접
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_11'				, type: 'string'	//외주가공
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_12'				, type: 'string'	//도금
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_13'				, type: 'string'	//도장
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_14'				, type: 'string'	//폴리싱
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_15'				, type: 'string'	//전해연마
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_16'				, type: 'string'	//인쇄
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_17'				, type: 'string'	//조립
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_18'				, type: 'string'	//세척
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_19'				, type: 'string'	//검사
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		},{	name: 'wkct_20'				, type: 'string'	//납품
			, conver : function(value, field){
				if(value=='0'){
					return;
				}else{
					return value;
				}
			}
		}
	]
});
