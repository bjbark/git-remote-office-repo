Ext.define('module.custom.hantop.item.itemmast.view.ItemMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast-lister',
	store		: 'module.custom.hantop.item.itemmast.store.ItemMast',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary' , remote : true } ],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
	viewConfig	: { markDirty: false , loadMask : false},

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
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } ,
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
					{   dataIndex: 'item_code'		, text : Language.get('item_code'	,'품목코드'	)	, width : 120, align : 'left'
					},{ dataIndex: 'item_idcd'		, text : Language.get('item_idcd'	,'품목ID'	)	, width : 170, align : 'left', hidden : true
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'	,'품목명'		)	, width : 170, align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'	,'품목규격'	)	, width :  90, align : 'left'
					},{ dataIndex: 'brnd_name'		, text : Language.get('brnd_name'	,'브랜드'		)	, width :  80, align : 'left'
					},{ dataIndex: 'acct_bacd_name'	, text : Language.get('acct_bacd_name','계정구분'	)	, width :  75, align : 'center'
					},{ dataIndex: 'item_dvcd'		, text : Language.get('item_dvcd'	,'품목구분'	)	, width :  75, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('item_dvcd'),hidden: true
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'	,'단위'		)	, width :  60, align : 'center'
					},{ dataIndex: 'rpst_item_name'	, text : Language.get('rpst_item_name','대표품목'	)	, width : 170, align : 'left'
					},{ dataIndex: 'item_leng'		, text : Language.get('item_leng'	,'길이'		)	, width :  55, align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'item_widh'		, text : Language.get('item_widh'	,'폭'		)	, width :  55, align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'item_hght'		, text : Language.get('item_hght'	,'높이'		)	, width :  55, align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'wdbf_yorn'		, text : Language.get('wdbf_yorn'	,'BF'		)	, width :  60, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'wdsf_yorn'		, text : Language.get('wdsf_yorn'	,'SF'		)	, width :  60, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'wdmf_yorn'		, text : Language.get('wdmf_yorn'	,'MF'		)	, width :  60, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'wdmc_yorn'		, text : Language.get('wdmc_yorn'	,'MC'		)	, width :  60, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'bfrn_yorn'		, text : Language.get('bfrn_yorn'	,'BF보강재'	)	, width :  60, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'sfrn_yorn'		, text : Language.get('sfrn_yorn'	,'SF보강재'	)	, width :  60, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'mfrn_yorn'		, text : Language.get('mfrn_yorn'	,'MF보강재'	)	, width :  62, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'glss_yorn'		, text : Language.get('glss_yorn'	,'유리'		)	, width :  60, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'wryp_yorn'		, text : Language.get('wryp_yorn'	,'레핑'		)	, width :  60, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					}
				]
			}
		;
		return item;
	}
});