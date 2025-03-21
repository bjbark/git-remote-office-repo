Ext.define('module.custom.hantop.prod.order.prodorder.model.ProdOrderCofmDetail2', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'lott_numb'				, type: 'string'	//INVOICE번호
		},{	name: 'line_seqn'				, type: 'float'		//순번
		},{	name: 'item_idcd'				, type: 'string'	//확정여부
		},{	name: 'bfsf_dvcd'				, type: 'string'	//순번
		},{	name: 'ivst_ordr'				, type: 'string'	//보조순번
		},{	name: 'cutt_union'				, type: 'string'	//절단내역
		},{	name: 'auto_yorn'				, type: 'string'	//자동절단여부
		},{	name: 'cutt_leng'				, type: 'float'		//절단길이
		},{	name: 'stnd_abar_leng'			, type: 'float'		//자재길이
		},{	name: 'bsmt_leng'				, type: 'float'		//
		},{	name: 'rate'					, type: 'float'		//
		},{	name: 'assi_seqn'				, type: 'float'		//
		},{	name: 'invc_numb'				, type: 'float'		//
		},{	name: 'ydge_used_yorn'			, type: 'float'		//자투리사용여부
		},{	name: 'auto_yorn'				, type: 'float'		//자동여부
		},{	name: 'chk'						, type: 'float'		//
		}
	],
});