Ext.define('module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-npaysumlist-lister2',
	store		: 'module.custom.sjflv.mtrl.isttcalc.npaysumlist.store.NpaySumListLister2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary'}],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('item_name') == '누계'){
				return 'text-blue';
			}
		}
	},

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-npaysumlist-worker-search'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : false,
				items	: [
					'->', '-' ,
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
					{ 	dataIndex: 'invc_date'		, text : Language.get('invc_date'	,'일자'	)	, width :  75 , align : 'center',
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'	,'품명'	)	, width : 180 ,
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'	,'규격'	)	, width : 120 ,
					},{ dataIndex: 'istt_qntt'		, text : Language.get('sale_qntt'	,'수량'	)	, width :  65 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'istt_pric'		, text : Language.get('sale_pric'	,'단가'	)	, width :  80 , xtype :'numericcolumn'
					},{ dataIndex: 'istt_amnt'		, text : Language.get('sale_amnt'	,'공급가'	)	, width :  95 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get('vatx_amnt'	,'부가세'	)	, width :  95 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'	,'합계금액')	, width :  95 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'iomy_amnt'		, text : Language.get('paym_amnt'	,'지급액'	)	, width :  95 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'npay_amnt'		, text : Language.get('npay_amnt'	,'미지급액')	, width :  95 , xtype :'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});