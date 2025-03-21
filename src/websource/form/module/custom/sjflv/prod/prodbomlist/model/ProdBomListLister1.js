Ext.define('module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister1', { extend:'Axt.data.Model',
	fields: [
		{	name: 'acpt_dvcd'		, type: 'string'						// 수주구분
		},{	name: 'invc_numb'		, type: 'string'						//invoice번호
		},{	name: 'line_seqn'		, type: 'float'
		},{	name: 'item_idcd'		, type: 'string'						// 품목ID
		},{	name: 'item_code'		, type: 'string'						// 품목코드
		},{	name: 'item_name'		, type: 'string'						// 품목명
		},{	name: 'item_spec'		, type: 'string'						// 품목규격
		},{	name: 'invc_date'		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//invoice일자
		},{	name: 'deli_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'cstm_name'		, type: 'string'						// 거래처명
		},{	name: 'revs_numb'		, type: 'float'  , defaultValue : 1		// 리비전
		},{	name: 'invc_qntt'		, type: 'float'  , defaultValue : 0		// 수주수량
		}
	]
});
