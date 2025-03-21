Ext.define('module.stock.isos.prodosttwork.view.ProdOsttWorkListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodosttwork-lister-master',

	store		: 'module.stock.isos.prodosttwork.store.ProdOsttWorkMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	viewConfig: {
		markDirty: false, loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
//					{text : '명세서'			 , iconCls: Const.REPORT.icon, action : 'etcPrintAction' 	} , '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style'} ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'}
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
					{	dataIndex: 'line_clos'		, width:  60, text: Language.get('line_clos'		, '상태'			), xtype: 'lookupcolumn'  , lookupValue : resource.lookup('line_clos'), align:'center'
					},{	dataIndex: 'invc_numb'		, width: 120, text: Language.get('ostt_numb'		, '출고번호'		), align:'center'
					},{	dataIndex: 'orig_invc_numb'	, width: 120, text: Language.get('ostt_indn_numb'	, '지시번호'		), align:'center'
					},{	dataIndex: 'item_code'		, width:  80, text: Language.get('item_code'		, '품목코드'		), align:'center'
					},{	dataIndex: 'item_name'		, width: 170, text: Language.get('item_name'		, '품명'			), align:'left'
					},{	dataIndex: 'invc_date'		, width:  80, text: Language.get('ostt_date'		, '출고일자'		), align:'left'
					},{	dataIndex: 'ostt_wrhs_name'	, width: 100, text: Language.get('ostt_wrhs_name'	, '출고창고'		), align:'left'
					},{	dataIndex: 'ostt_usge_name'	, width:  70, text: Language.get('ostt_usge_name'	, '출고용도'		), align:'center'
					},{	dataIndex: 'drtr_name'		, width:  70, text: Language.get('drtr_name'		, '담당자'			)
					},{	dataIndex: 'indn_qntt'		, width: 80 , text: Language.get('indn_qntt'		, '계획수량'		), xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'strt_dttm'		, width: 125, text: Language.get('strt_dttm'		, '시작일시'		), align:'center'
					},{	dataIndex: 'endd_dttm'		, width: 125, text: Language.get('endd_dttm'		, '완료일시'		), align:'center'
					},{	dataIndex: 'remk_text'		, width: 185, text: Language.get('remk_text'		, '비고'			), align:'left'
					}
				]
			};
		return item;
	}
 });
