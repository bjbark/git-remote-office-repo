Ext.define('module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkListerDetail2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-purcpaywork-lister-detail2',
	store		: 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerDetail2',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary', remote : false }],
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],


	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {

		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , itemId : 'detail2' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width : 40 , align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	) , width : 80 , align : 'center'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 150 , align : 'left'
					},{	dataIndex: 'unit_name'	, text : Language.get('unit_name'	,'단위'		) , width :  50 , xtype : 'numericcolumn'
					},{	dataIndex: 'qntt'		, text : Language.get('qntt'		,'수량'		) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'istt_pric'	, text : Language.get('istt_pric'	,'단가'		) , width :  100 , xtype : 'numericcolumn'
					},{	dataIndex: 'sply_amnt'	, text : Language.get('sply_amnt'	,'공급가'	) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'	) , width  :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'	) , width :  190 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'unpaid'		, text : Language.get(''			,'미지급액'	) , width :  190 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  :  1
					}
				]
			};
		return item;
	}
 });