Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanMaster', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-prodplan-master',
	store	: 'module.custom.iypkg.prod.prodplan.store.ProdPlanMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SIMPLE' },
	features: [{ftype :'grid-summary'}] ,
	columnLines: true,
	border : 0,
	region : 'center',


	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">작업계획서 발행</span>'	, action : 'printAction', cls: 'button1-style'	, width: 90,
						hidden	: (_global.stor_id.toUpperCase()!= 'N1000DAE-A1000'?true:false)} , '-',
					{	text : '<span class="write-button">설비등록</span>'	, action : 'workAction'	, cls: 'button1-style'	, width: 80 },
					{	text : '<span class="write-button">작업지시서 발행</span>'	, action : 'workreportAction'	, cls: 'button1-style'	, width: 90,
						hidden	: (_global.stor_id.toUpperCase()!= 'N1000LIEBE1000'?true:false)} , '-',
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'plan_sttm'		, width:  80, align : 'center'	, text: Language.get(''	, '계획일자')
					},{	dataIndex:	'acpt_numb'		, width: 180, align : 'left'	, text: Language.get(''	, '수주일자'),hidden : true
					},{	dataIndex:	'line_seqn'		, width: 180, align : 'left'	, text: Language.get(''	, '순번'),hidden : true
					},{	dataIndex:	'invc_seqn'		, width: 180, align : 'left'	, text: Language.get(''	, '순번'),hidden : true
					},{	dataIndex:	'cstm_name'		, width: 180, align : 'left'	, text: Language.get(''	, '거래처'	)
					},{	dataIndex:	'prod_name'		, width: 230, align : 'left'	, text: Language.get(''	, '품명'	)
					},{	dataIndex:	'item_leng'		, width:  60, align : 'right'	, text: Language.get(''	, '장'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_widh'		, width:  60, align : 'right'	, text: Language.get(''	, '폭'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_hght'		, width:  60, align : 'right'	, text: Language.get(''	, '고'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'cvic_name'		, width: 120, align : 'left'	, text: Language.get(''	, '설비'	)
					}
				]
			}
		;
		return item;
	}

});
