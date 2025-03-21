Ext.define('module.custom.komec.item.bomlist.model.BomListCstmLister4',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'id'					, type: 'string'
		},{ name: 'prnt_item_idcd'		, type: 'string', mapping : 'resource.prnt_item_idcd'
		},{ name: 'ivst_item_idcd'		, type: 'string', mapping : 'resource.ivst_item_idcd'
		},{ name: 'line_seqn'			, type: 'int'   , mapping : 'resource.line_seqn'
		},{	name: 'item_idcd'			, type: 'string', mapping : 'resource.item_idcd'
		},{	name: 'item_name'			, type: 'string', mapping : 'resource.item_name'
		},{	name: 'item_code'			, type: 'string', mapping : 'resource.item_code'
		},{	name: 'item_spec'			, type: 'string', mapping : 'resource.item_spec'
		},{	name: 'mixx_rate'			, type: 'float' , mapping : 'resource.mixx_rate'
		},{	name: 'ofap_mixx_rate'		, type: 'float' , mapping : 'resource.ofap_mixx_rate'
		},{	name: 'adpt_date'			, type: 'string', mapping : 'resource.adpt_date', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr
		},{	name: 'kfda'				, type: 'string', mapping : 'resource.kfda'
		},{	name: 'fema'				, type: 'string', mapping : 'resource.fema'
		},{	name: 'seqc'				, type: 'string', mapping : 'resource.seqc'
		},{	name: 'wdgb'				, type: 'string', mapping : 'resource.wdgb'
		},{	name: 'caca'				, type: 'string', mapping : 'resource.caca'
		},{	name: 'algy_yorn'			, type: 'string', mapping : 'resource.algy_yorn'
		},{	name: 'hala_numb'			, type: 'string', mapping : 'resource.hala_numb'
		},{	name: 'natr_name'			, type: 'string', mapping : 'resource.natr_name'
		},{	name: 'incm_cost'			, type: 'float ', mapping : 'resource.incm_cost'


		},{	name: 'user_memo'			, type: 'string', mapping : 'resource.user_memo'
		},{	name: 'sysm_memo'			, type: 'string', mapping : 'resource.sysm_memo'
		},{	name: 'prnt_idcd'			, type: 'string', mapping : 'resource.prnt_idcd'
		},{	name: 'line_levl'			, type: 'float' , mapping : 'resource.line_levl'
		},{	name: 'line_ordr'			, type: 'string', mapping : 'resource.line_ordr'
		},{	name: 'line_stat'			, type: 'string', mapping : 'resource.line_stat'
		},{	name: 'line_clos'			, type: 'string', mapping : 'resource.line_clos'
		},{	name: 'find_name'			, type: 'string', mapping : 'resource.find_name'
		},{	name: 'updt_user_name'		, type: 'string', mapping : 'resource.updt_user_name'
		},{	name: 'updt_ipad'			, type: 'string', mapping : 'resource.updt_ipad'
		},{	name: 'updt_dttm'			, type: 'string', mapping : 'resource.updt_dttm'
		},{	name: 'updt_idcd'			, type: 'string', mapping : 'resource.updt_idcd'
		},{	name: 'updt_urif'			, type: 'string', mapping : 'resource.updt_urif'
		},{	name: 'crte_user_name'		, type: 'string', mapping : 'resource.crte_user_name'
		},{	name: 'crte_ipad'			, type: 'string', mapping : 'resource.crte_ipad'
		},{	name: 'crte_dttm'			, type: 'string', mapping : 'resource.crte_dttm'
		},{	name: 'crte_idcd'			, type: 'string', mapping : 'resource.crte_idcd'
		},{	name: 'crte_urif'			, type: 'string', mapping : 'resource.crte_urif'
		},{	name: 'has_chld'			, type: 'string', mapping : 'resource.has_chld'
		}
	],
	idProperty: 'id'+'prnt_idcd'
});
