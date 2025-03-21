Ext.define('module.mtrl.istt.isttsumlist.view.IsttSumListListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isttsumlist-lister-master',
	store		: 'module.mtrl.istt.isttsumlist.store.IsttSumListMaster',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
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
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 200 , align : 'left' , flex : 1
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 150 , align : 'left'
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'수량'		) , width : 150 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_pric'		, text : Language.get('istt_pric'		,'평균단가'		) , width : 150 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'공급가액'		) , width : 150 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'		) , width : 150 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width : 150 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});