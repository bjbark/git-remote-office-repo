Ext.define('module.custom.hjsys.sale.order.saleorder.model.SaleOrderBomListMaster',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'id'					, type: 'string'
		},{ name: 'line_seqn'			, type: 'int'   , mapping : 'resource.line_seqn'
 		},{ name: 'text'				, type: 'string', mapping : 'resource.item_name'
		},{	name: 'invc_numb'			, type: 'string', mapping : 'resource.invc_numb'
		},{	name: 'item_idcd'			, type: 'string', mapping : 'resource.item_idcd'
		},{	name: 'item_name'			, type: 'string', mapping : 'resource.item_name'
		},{	name: 'item_code'			, type: 'string', mapping : 'resource.item_code'
		},{	name: 'unit_name'			, type: 'string', mapping : 'resource.unit_name'
		},{	name: 'invc_date'			, type: 'string', mapping : 'resource.invc_date' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'hash_set'			, type: 'string', mapping : 'resource.hash_set'
		},{	name: 'drwg_numb'			, type: 'string', mapping : 'resource.drwg_numb'
		},{	name: 'revs_numb'			, type: 'string', mapping : 'resource.revs_numb'
		},{	name: 'acct_name'			, type: 'string', mapping : 'resource.acct_name'
		}

	],
	idProperty: 'id'+'prnt_idcd'
});
