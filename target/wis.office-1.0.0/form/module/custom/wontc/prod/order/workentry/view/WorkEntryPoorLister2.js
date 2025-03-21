Ext.define('module.custom.wontc.prod.order.workentry.view.WorkEntryPoorLister2', { extend: 'Axt.grid.Panel',
	id			: 'module-wontc-workentry-poor2',
	alias		: 'widget.module-wontc-workentry-poor2'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.wontc.prod.order.workentry.store.WorkEntryPoorLister2',
	border		: 0,
	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : false } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+'cell2';
		}
	},

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
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid2',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'등록일자'	) , width : 200 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'	) , flex  :   1 , align :'left'
					},{ dataIndex: 'poor_name'		, text : Language.get('poor_name'		,'불량사유'	) , flex  :   1 , align :'left'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width : 200 , xtype:'numericcolumn', align:'right', summaryType : 'sum'
					}
				]
			}
		;
		return item;
	}
});