Ext.define('module.custom.hjsys.sale.order.slorlist1.model.SlorList1Detail',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'line_seqn'			, type: 'int'  , defaultValue : 1			//순번
		},{	name: 'wkct'				, type: 'wkct'			//구분
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'indn_qntt'			, type: 'float' 		//지시수량
		},{	name: 'acpt_qntt'			, type: 'float' 		//수주수량
		},{	name: 'invc_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'deli_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'modl_name'			, type: 'string' 	//모델명
		},{	name: 'dlvy_cstm_name'		, type: 'string' 	//납품처명
		},{	name: 'cstm_name'			, type: 'string' 	//고객명
		},{	name: 'unit_name'			, type: 'string' 	//단위명
		},{	name: 'acpt_numb'			, type: 'string' 	//수주번호

		},{	name: 'wkct_1'				, type: 'string'	//설계
		},{	name: 'wkct_2'				, type: 'string'	//전개
		},{	name: 'wkct_3'				, type: 'string'	//CAM
		},{	name: 'wkct_4'				, type: 'string'	//NCT
		},{	name: 'wkct_5'				, type: 'string'	//LASER
		},{	name: 'wkct_6'				, type: 'string'	//TAP
		},{	name: 'wkct_7'				, type: 'string'	//면취
		},{	name: 'wkct_8'				, type: 'string'	//홀면취
		},{	name: 'wkct_9'				, type: 'string'	//장공면취
		},{	name: 'wkct_10'				, type: 'string'	//버링
		},{	name: 'wkct_11'				, type: 'string'	//압입1
		},{	name: 'wkct_12'				, type: 'string'	//압입2
		},{	name: 'wkct_13'				, type: 'string'	//확공
		},{	name: 'wkct_14'				, type: 'string'	//C/S
		},{	name: 'wkct_15'				, type: 'string'	//디버링
		},{	name: 'wkct_16'				, type: 'string'	//절곡1
		},{	name: 'wkct_17'				, type: 'string'	//절곡2
		},{	name: 'wkct_18'				, type: 'string'	//사상
		},{	name: 'wkct_19'				, type: 'string'	//용접1
		},{	name: 'wkct_20'				, type: 'string'	//용접2
		},{	name: 'wkct_21'				, type: 'string'	//빠우
		},{	name: 'wkct_22'				, type: 'string'	//외주가공
		},{	name: 'wkct_23'				, type: 'string'	//조립
		},{	name: 'wkct_24'				, type: 'string'	//세척
		},{	name: 'wkct_25'				, type: 'string'	//검사
		},{	name: 'wkct_26'				, type: 'string'	//후TAP
		},{	name: 'wkct_27'				, type: 'string'	//전해연마
		},{	name: 'w_1'					, type: 'string'	//설계
		},{	name: 'w_2'					, type: 'string'	//NCT
		},{	name: 'w_3'					, type: 'string'	//LASER
		},{	name: 'w_4'					, type: 'string'	//사상
		},{	name: 'w_5'					, type: 'string'	//드릴
		},{	name: 'w_6'					, type: 'string'	//C/S
		},{	name: 'w_7'					, type: 'string'	//TAP
		},{	name: 'w_8'					, type: 'string'	//절곡1
		},{	name: 'w_9'					, type: 'string'	//절곡2
		},{	name: 'w_10'				, type: 'string'	//용접
		},{	name: 'w_11'				, type: 'string'	//외주가공
		},{	name: 'w_12'				, type: 'string'	//도금
		},{	name: 'w_13'				, type: 'string'	//도장
		},{	name: 'w_14'				, type: 'string'	//폴리싱
		},{	name: 'w_15'				, type: 'string'	//전해연마
		},{	name: 'w_16'				, type: 'string'	//인쇄
		},{	name: 'w_17'				, type: 'string'	//조립
		},{	name: 'w_18'				, type: 'string'	//세척
		},{	name: 'w_19'				, type: 'string'	//검사
		},{	name: 'w_20'				, type: 'string'	//납품
		}
	]
});
