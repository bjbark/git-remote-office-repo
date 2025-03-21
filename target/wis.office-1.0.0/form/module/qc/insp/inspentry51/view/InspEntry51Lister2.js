Ext.define('module.qc.insp.inspentry51.view.InspEntry51Lister2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-inspentry51-lister2',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },

	store		: 'module.qc.insp.inspentry51.store.InspEntry51Lister2',

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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
						{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'INOVICE번호')	, width : 120 , align : 'center', hidden : true
						},{ dataIndex: 'bzpl_idcd'		, text : Language.get('bzpl_idcd'		,'사업장ID')		, width : 80  , align : 'center', hidden : true
						},{ dataIndex: 'spts_seqn'		, text : Language.get('spts_seqn'		,'순번')			, width : 50  , align : 'center',
						},{ dataIndex: 'spts_numb'		, text : Language.get('spts_numb'		,'출고의뢰번호')		, width : 140 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('spts_numb')
						},{ dataIndex: 'invc_date'		, text : Language.get('ostt_date'		,'출고일자')		, width : 100 , align : 'center'
						},{ dataIndex: 'spts_date'		, text : Language.get('spts_date'		,'출고의뢰일자')	, width : 80  , hidden : true
						},{ dataIndex: 'spts_dept_idcd'	, text : Language.get('spts_dept_idcd'	,'출고의뢰부서ID')	, width : 80  , hidden : true
						},{ dataIndex: 'spts_drtr_idcd'	, text : Language.get('spts_drtr_idcd'	,'출고의뢰담당자ID'), width : 90  , hidden : true
						},{ dataIndex: 'item_idcd'		, text : Language.get('item_idcd'		,'품목ID')		, width : 90  , hidden : true
						},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')			, width : 350 , align : 'left'
						},{ dataIndex: 'unit_idcd'		, text : Language.get('unit_idcd'		,'단위ID')		, width : 80  , hidden : true
						},{ dataIndex: 'spts_qntt'		, text : Language.get('spts_qntt'		,'출고의뢰수량')	, width : 90  , xtype : 'numericcolumn'
						},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자')		, width : 100 ,
						},{ dataIndex: 'wrhs_idcd'		, text : Language.get('wrhs_idcd'		,'창고ID')		, width : 80  , hidden : true
						},{ dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'		,'창고명')		, width : 80  , align : 'left'
						},{ dataIndex: 'cstm_idcd'		, text : Language.get('cstm_idcd'		,'거래처ID')		, width : 80  , xtype : 'numericcolumn', hidden : true
						},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명')		, width : 180 , align : 'center'
						},{ dataIndex: 'insp_drtr_idcd'	, text : Language.get('insp_drtr_idcd'	,'검사담당자ID')	, width : 80  , align : 'center', hidden : true
						},{ dataIndex: 'insp_drtr_name'	, text : Language.get('insp_drtr_name'	,'검사담당자')		, width : 100 , align : 'left'
						},{ dataIndex: 'insp_qntt'		, text : Language.get('insp_qntt'		,'검사수량')		, width : 80  , align : 'right' , xtype : 'numericcolumn'
						},{ dataIndex: 'pass_qntt'		, text : Language.get('pass_qntt'		,'합격수량')		, width : 80  , align : 'right' , xtype : 'numericcolumn'
						},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량')		, width : 80  , align : 'right' , xtype : 'numericcolumn'
						},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			, flex  : 100 , align : 'center'
					}
				]
			}
		;
		return item;
	},
});