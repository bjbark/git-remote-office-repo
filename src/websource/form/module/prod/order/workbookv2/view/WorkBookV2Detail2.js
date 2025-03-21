Ext.define('module.prod.order.workbookv2.view.WorkBookV2Detail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv2-detail2'			,
	store		: 'module.prod.order.workbookv2.store.WorkBookV2Detail2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'loss_resn_dvcd'	, text : Language.get('loss_resn_dvcd'	,'유실코드'		) , width : 80  , align : 'center'
					},{ dataIndex: 'loss_name'		, text : Language.get('loss_name'		,'유실명칭'		) , flex  : 100 , align :'left'
					},{ dataIndex: 'sttm'			, text : Language.get('sttm'			,'시작시간'		) , width : 70 , align : 'center'
					},{ dataIndex: 'edtm'			, text : Language.get('edtm'			,'종료시간'		) , width : 70 , align : 'center'
					},{ dataIndex: 'loss_time'		, text : Language.get('loss_time'		,'유실시간'		) , width : 70 , xtype :'numericcolumn',summaryType: 'sum',
						renderer:function(val){
							var floor = Number(val)/60;
							var value = floor.toFixed(1);
							return Number(value);
						},
						summaryRenderer: function(value, summaryData, field,a,b,c) {
							var floor = Number(value)/60;
							var values = floor.toFixed(1);
							return Number(values);
						}
					},{ dataIndex: 'crte_dttm'		, text : Language.get('crte_dttm'		,'발생시간'		) , width : 130 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});