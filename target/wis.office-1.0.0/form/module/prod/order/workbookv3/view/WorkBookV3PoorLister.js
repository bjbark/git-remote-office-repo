Ext.define('module.prod.order.workbookv3.view.WorkBookV3PoorLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv3-poor'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workbookv3.store.WorkBookV3PoorLister',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.hq_id+"cell";
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
			var store = Ext.ComponentQuery.query('module-workbookv3-poor')[0].getStore(),
				master = Ext.ComponentQuery.query('module-workbookv3-lister')[0],
				select = master.getSelectionModel().getSelection()[0],
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
				cls: _global.hq_id+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'poor_bacd'		, text : Language.get('poor_bacd'		,'불량코드'	) , width : 140 , align : 'center'
					},{ dataIndex: 'poor_name'		, text : Language.get('poor_name'		,'불량명칭'	) , flex  : 100 , align :'left'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width : 180 , align:'right' , xtype:'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});