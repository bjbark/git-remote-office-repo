Ext.define('module.custom.komec.prod.order.workbook.view.WorkBookPoorLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-workbook-poor'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.komec.prod.workbook.store.WorkBookPoorLister',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary'  } ],
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

	listeners:{
		afterrender:function(){
			var store = Ext.ComponentQuery.query('module-komec-workbook-poor')[0].getStore(),
				detail = Ext.ComponentQuery.query('module-komec-workbook-detail')[0],
				select = detail.getSelectionModel().getSelection()[0],
				param = Ext.merge( { invc_numb : select.get('invc_numb')
				})
			;
			store.load({
				params : { param:JSON.stringify(
						param
				) },
				scope:this,
				callback:function(records, operation, success) {
				}
			});
		},
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'poor_bacd'		, text : Language.get('poor_bacd'		,'불량코드'	) , width : 140  , align : 'center'
					},{ dataIndex: 'poor_name'		, text : Language.get('poor_name'		,'불량명칭'	) , flex  : 100 , align :'left'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width : 180 , xtype:'numericcolumn', summaryType: 'sum',
						summaryRenderer: function(value, summaryData, field) {
							var window	= me.up('window');
								form	= window.down('form')
							;
								var val = Ext.util.Format.number(Number(value), '0,000');

								var x = '<span class="btnTemp" style="color:black;font-size:1.5em;">'+val+'</span>'
							return x;
						}
					}
				]
			}
		;
		return item;
	}
});