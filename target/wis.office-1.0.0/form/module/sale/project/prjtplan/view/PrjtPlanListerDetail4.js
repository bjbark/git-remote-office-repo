Ext.define('module.sale.project.prjtplan.view.PrjtPlanListerDetail4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtplan-lister-detail4',
	store		: 'module.sale.project.prjtplan.store.PrjtPlanDetail1',
	plugins       : [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	text	: '품목 트리'	, dataIndex: 'text'	, width : 500	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{	text : '순서'			, dataIndex: 'line_seqn'		, width :  40	, align : 'center', xtype : 'numericcolumn'
					},{ text : '투입품명'		, dataIndex: 'item_name'		, width : 200	, hidden : true
					},{ text : '품목규격'		, dataIndex: 'item_spec'		, width : 130
					},{ text : '조달구분'		, dataIndex: 'item_spec'		, width :  90
					},{ text : '투입공정'		, dataIndex: 'ivst_wkct_name'	, width : 130
					},{ text : '소요량'		, dataIndex: 'ndqt_nmrt'		, width :  85	, xtype : 'numericcolumn'
					},{ text : '사내LOSS율'	, dataIndex: 'incm_loss_rate'	, width :  80	, xtype : 'numericcolumn'
					},{ text : '외주LOSS율'	, dataIndex: 'otcm_loss_rate'	, width :  80	, xtype : 'numericcolumn'
					},{	text : '등록일자'		, dataIndex: 'strt_date'		, width :  80
					},{ text : '메모'			, dataIndex: 'user_memo'		, flex  : 1
					}
				]
			}
		;
		return item;
	}
});