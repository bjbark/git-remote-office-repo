Ext.define('module.custom.iypkg.eis.eisreport.view.EisReportPoorLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport-poor'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.custom.iypkg.eis.eisreport.store.EisReportPoorLister',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary'  } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
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
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:2.5em !important;'},
				items : [
					{	dataIndex: 'poor_bacd'		, text : Language.get('poor_bacd'		,'불량코드'	) , width : 140  , align : 'center'
					},{ dataIndex: 'poor_name'		, text : Language.get('poor_name'		,'불량명칭'	) , flex  : 100 , align :'left'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width : 180 , xtype:'numericcolumn', summaryType: 'sum',
//						summaryRenderer: function(value, summaryData, field) {
//							var window	= me.up('window');
//								form	= window.down('form')
//							;
//								var val = Ext.util.Format.number(Number(value), '0,000');
//
//								var x = '<span class="btnTemp" style="color:black;font-size:1.5em;">'+val+'</span>'
//							return x;
//						}
					}
				]
			}
		;
		return item;
	}
});