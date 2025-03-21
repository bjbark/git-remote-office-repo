Ext.define('module.sale.project.prjtprocess.view.PrjtProcessListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtprocess-lister-detail2',
	store		: 'module.sale.project.prjtprocess.store.PrjtProcessDetail2',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
			items :[
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')		, width :  50 , align : 'center'
					},{	dataIndex: 'regi_date'		, text : Language.get('regi_date'		,'등록일자')	, width :  80 , align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'변경품목')	, width : 180 , align : 'left' , hidden : true
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'변경규격')	, width : 150 , align : 'left' , hidden : true
					},{	dataIndex: 'chge_resn'		, text : Language.get('chge_resn'		,'변경사유')	, flex  : 100 , align : 'left'
					},{	dataIndex: 'cpst_dvcd'		, text : Language.get('cpst_dvcd'		,'유무상구분')	, width :  90 , align : 'center' , xtype : 'lookupcolumn', lookupValue : resource.lookup('cpst_dvcd')
					},{	dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'		,'견적금액')	, width :  90 , align : 'right'  , xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'chge_deli_date'	, text : Language.get('chge_deli_date'	,'조정납기일자')	, width :  90 , align : 'center'
					},{	dataIndex: 'frst_exam_date'	, text : Language.get('frst_exam_date'	,'1차시험일자')	, width :  90 , align : 'center'
					},{	dataIndex: 'send_exam_date'	, text : Language.get('send_exam_date'	,'2차시험일자')	, width :  90 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});
