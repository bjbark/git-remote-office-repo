Ext.define('module.basic.funcwrhsmast.view.FuncWrhsMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-funcwrhsmast-lister',
	store		: 'module.basic.funcwrhsmast.store.FuncWrhsMast',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary' , remote : true } ],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
			me.paging  = me.pagingItem();
			me.columns = me.columnItem();
			me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
					{	dataIndex:	'line_stat'			, width: 50 , text: Language.get('line_stat'	   ,'사용'			), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex:	'func_wrhs_idcd'	, width:  80, text: Language.get( 'func_wrhs_idcd' , '기능창고ID'		), align : 'left'	, hidden : true
					},{	dataIndex:	'func_wrhs_code'	, width:  80, text: Language.get( 'func_wrhs_code' , '창고코드'		), align : 'center'
					},{	dataIndex:	'func_wrhs_name'	, width: 180, text: Language.get( 'func_wrhs'      , '창고명'			), align : 'left'
					},{	dataIndex:	'mngt_wrhs_dvcd'	, width: 100, text: Language.get( 'mngt_wrhs_dvcd' , '창고구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'mngt_wrhs_dvcd' ), align : 'center'
					},{	dataIndex:	'istt_insp_yorn'	, width:  60, text: Language.get( 'istt_insp_yorn' , '입고검사'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'poor_yorn'			, width:  60, text: Language.get( 'poor_yorn'      , '불량'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'prod_optn_yorn'	, width:  60, text: Language.get( 'prod_optn_yorn' , '생산옵션'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'dlvy_yorn'			, width:  60, text: Language.get( 'dlvy_yorn'      , '적송'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'sale_idle_yorn'	, width:  60, text: Language.get( 'sale_idle_yorn' , '매출대기'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'cspc_idle_yorn'	, width:  80, text: Language.get( 'cspc_idle_yorn' , '수탁대기'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'sets_cnst_yorn'	, width:  60, text: Language.get( 'sets_cnst_yorn' , '세트구성'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'issb_poor_yorn'	, width:  80, text: Language.get( 'issb_poor_yorn' , '입고불량'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'prod_cotr_yorn'	, width:  60, text: Language.get( 'prod_cotr_yorn' , '제품용기'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'wdrw_cotr_yorn'	, width:  60, text: Language.get( 'wdrw_cotr_yorn' , '회수용기'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'istt_idle_yorn'	, width:  60, text: Language.get( 'istt_idle_yorn' , '입고대기'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'puch_idle_yorn'	, width:  60, text: Language.get( 'puch_idle_yorn' , '매입대기'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), align : 'center'
					},{	dataIndex:	'user_memo'			, flex :   1, text: Language.get( 'user_memo'      , '메모'			)
					}
				]
			}
		;
		return item;
	}
});