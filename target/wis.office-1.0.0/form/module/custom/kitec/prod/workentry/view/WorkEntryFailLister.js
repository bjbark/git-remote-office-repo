Ext.define('module.custom.kitec.prod.workentry.view.WorkEntryFailLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-kitec-workenty-fail'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.kitec.prod.workentry.store.WorkEntryFailLister',
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
					{text : '<span class="btnTemp" style="font-size:1.8em;">'+Language.get('delete'	,'삭제') +'</span>', iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button1-style', width: 90, height : 35, margin: '0 5 0 0' }
				]
			};
		return item ;
	},

	listeners:{
		afterrender:function(){
			var store = Ext.ComponentQuery.query('module-kitec-workenty-fail')[0].getStore(),
				detail = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0],
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
					{	dataIndex: 'loss_resn_dvcd'	, text : Language.get('loss_resn_dvcd'	,'유실코드'		) , width : 70  , align : 'center'
					},{ dataIndex: 'loss_name'		, text : Language.get('loss_name'		,'유실명칭'		) , flex  : 100 , align :'left'
					},{ dataIndex: 'sttm'			, text : Language.get('sttm'			,'시작시간'		) , width : 90  , align : 'center'
					},{ dataIndex: 'edtm'			, text : Language.get('edtm'			,'종료시간'		) , width : 90  , align : 'center'
					},{ dataIndex: 'loss_time'		, text : Language.get('loss_time'		,'유실시간(분)'	) , width : 120 , xtype:'numericcolumn', summaryType : 'sum'
					}
				]
			}
		;
		return item;
	}
});