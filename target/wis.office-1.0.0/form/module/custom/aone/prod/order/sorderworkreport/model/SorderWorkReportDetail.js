Ext.define('module.custom.aone.prod.order.sorderworkreport.model.SorderWorkReportDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'work_invc_numb'		, type: 'string' 		//작업보고 invc번호
		},{	name: 'line_seqn'			, type: 'float'
		},{	name: 'item_imge3'			, type: 'string'		//수리이미지1
		},{	name: 'item_imge4'			, type: 'string'		//수리이미지2
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'json_data'			, type: 'string'		//json_data
		},{	name: 'pric'				, type: 'float'			//단가
		},{	name: 'amnt'				, type: 'float'			//판매금액
		},{	name: 'need_qntt'			, type: 'float'			//소요량
		}
	],
});