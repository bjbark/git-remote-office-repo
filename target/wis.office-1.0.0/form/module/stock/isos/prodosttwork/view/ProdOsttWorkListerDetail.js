Ext.define('module.stock.isos.prodosttwork.view.ProdOsttWorkListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodosttwork-lister-detail',

	store: 'module.stock.isos.prodosttwork.store.ProdOsttWorkDetail',

	border : 0 ,
	columnLines: true ,
	features: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'}
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex : 'line_seqn'		, width :  50 , text: Language.get('line_seqn'		,'순번')		, align: 'center'
					},{	dataIndex : 'item_name'		, width : 200 , text: Language.get('item_name'		,'품명')		, align: 'left'
					},{	dataIndex : 'item_spec'		, width : 160 , text: Language.get('item_spec'		,'규격')		, align: 'left'
					},{	dataIndex : 'unit_name'		, width :  60 , text: Language.get('unit_name'		,'단위')		, align: 'left'
					},{	dataIndex : 'lott_numb'		, width : 150 , text: Language.get('lott_numb'		,'Lot번호')	, align: 'left'
					},{	dataIndex : 'ostt_qntt'		, width :  80 , text: Language.get('ostt_qntt'		,'출고수량')	, xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex : 'stnd_pric'		, width :  80 , text: Language.get('stnd_pric'		,'단가')		, xtype : 'numericcolumn', format:  '#,##0'
					},{	dataIndex : 'amnt'			, width : 100 , text: Language.get('amnt'			,'금액')		, xtype : 'numericcolumn', format:  '#,##0'
					},{	dataIndex : 'remk_text'		, flex  :   1 , text: Language.get('remk_text'		,'비고')		, align: 'left'
					}
				]
			};
		return item;
	}
 });
