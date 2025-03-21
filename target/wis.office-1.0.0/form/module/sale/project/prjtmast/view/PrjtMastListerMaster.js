Ext.define('module.sale.project.prjtmast.view.PrjtMastListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtmast-lister-master',
	store		: 'module.sale.project.prjtmast.store.PrjtMastMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
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
					'->', '-' ,
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat', text : Language.get('line_stat', '상태'		), width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'prjt_code', text : Language.get('prjt_code', '프로젝트코드'	), width : 110 , align : 'center'
					},{ dataIndex: 'prjt_name', text : Language.get('prjt_name', '프로젝트명'	), width : 170 , align : 'left'
					},{ dataIndex: 'cstm_idcd', text : Language.get('cstm_idcd', '거래처코드'	), width : 100 , align : 'center', hidden : true
					},{ dataIndex: 'cstm_name', text : Language.get('cstm_name', '거래처명'	), width : 170 , align : 'left'
					},{ dataIndex: 'item_idcd', text : Language.get('item_idcd', '품목코드'	), width : 120 , align : 'center', hidden : true
					},{ dataIndex: 'item_name', text : Language.get('item_name', '품명'		), width : 220 , align : 'left'
					},{ dataIndex: 'item_spec', text : Language.get('item_spec', '규격'		), width : 180 , align : 'left'
					},{ dataIndex: 'modl_name', text : Language.get('modl_name', '모델명'		), width : 120 , align : 'left'
					},{ dataIndex: 'regi_date', text : Language.get('regi_date', '등록일자'	), width : 90  , align : 'center'
					},{ dataIndex: 'strt_date', text : Language.get('strt_date', '착수일자'	), width : 90  , align : 'center'
					},{ dataIndex: 'endd_date', text : Language.get('endd_date', '완료일자'	), width : 90  , align : 'center'
					},{ dataIndex: 'drtr_idcd', text : Language.get('drtr_idcd', '영업담당'	), width : 90  , align : 'center', hidden : true
					},{ dataIndex: 'drtr_name', text : Language.get('drtr_name', '영업담당'	), width : 90  , align : 'center'
					},{ dataIndex: 'user_memo', text : Language.get('user_memo', '비고'		), flex  : 100
					}
				]
			}
		;
		return item;
	}
});
