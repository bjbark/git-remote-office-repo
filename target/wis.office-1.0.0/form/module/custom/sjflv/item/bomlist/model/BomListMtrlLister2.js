Ext.define('module.custom.sjflv.item.bomlist.model.BomListMtrlLister2', { extend:'Axt.data.Model',
	fields: [
		{	name: 'prnt_item_idcd'	, type: 'string'						//부모품목ID
		},{	name: 'item_code'		, type: 'string'						//품목코드
		},{	name: 'item_name'		, type: 'string'						//품목명
		},{	name: 'revs_numb'		, type: 'string'						//리비젼번호
		},{	name: 'mixx_rate'		, type: 'float'							//배합비
		},{	name: 'adpt_date'		, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		}
	]
});
