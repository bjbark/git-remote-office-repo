Ext.define('module.custom.wontc.prod.order.workentry.view.WorkEntryPoorLister', { extend: 'Axt.grid.Panel',
	id			: 'module-wontc-workentry-poor',
	alias		: 'widget.module-wontc-workentry-poor'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.wontc.prod.order.workentry.store.WorkEntryPoorLister',
	border		: 0,
	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : false } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
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
					{text : '<span class="btnTemp" style="font-size:1.8em;">삭제</span>', iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button1-style', width: 90, height : 35, margin: '0 5 0 0' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'poor_bacd'		, text : Language.get('poor_bacd'		,'불량코드'	) , width : 140  , align : 'center'
					},{ dataIndex: 'poor_name'		, text : Language.get('poor_name'		,'불량명칭'	) , flex  : 100 , align :'left'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width : 180 , xtype:'numericcolumn', align:'right', summaryType : 'sum'
					}
				]
			}
		;
		return item;
	}
});