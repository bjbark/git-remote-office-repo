Ext.define('module.prod.order.workentry.view.WorkEntryListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.prod.order.workentry.store.WorkEntry',
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId:'master' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')			, width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호')		, width : 120 , align : 'center'
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자')		, width : 120 ,align:'center'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'생산LOT번호')	, width : 100 , align:'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')			, width : 200
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격')			, width : 120
					},{ dataIndex: 'mold_code'		, text : Language.get('acpt_numb'		,'금형코드')		, width : 120
					},{ dataIndex: 'mtrl_name'		, text : Language.get('mtrl_name'		,'재질')			, width : 120
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량')		, width : 80  ,xtype:'numericcolumn'
					},{ dataIndex: 'wkfw_name'		, text : Language.get('wkfw_name'		,'생산라인')		, width : 120 , align : 'center',hidden:true
					},{ dataIndex: 'bomt_degr'		, text : Language.get('bomt_degr'		,'BOM차수')		, width : 70  , xtype:'numericcolumn',hidden:true
					},{ dataIndex: 'pdsd_date'		, text : Language.get('pdsd_date'		,'착수예정')		, width : 120 ,align : 'center',
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료예정')		, width : 120 , align : 'center',align : 'center',
					},{ dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호')		, width : 120
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명')		, width : 160 ,
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자')		, width : 120 , align : 'center',
					},{ dataIndex: 'wkct_insp_yorn'	, text : Language.get('wkct_insp_yorn'	,'검사여부')		, width : 120 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자')		, width : 120 , hidden:true
					}
				]
			}
		;
		return item;
	}
});