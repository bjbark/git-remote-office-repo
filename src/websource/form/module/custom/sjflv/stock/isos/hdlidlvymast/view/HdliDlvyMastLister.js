Ext.define('module.custom.sjflv.stock.isos.hdlidlvymast.view.HdliDlvyMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hdlidlvymast-lister'			,
	store		: 'module.custom.sjflv.stock.isos.hdlidlvymast.store.HdliDlvyMast'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item_sjflv = {
				defaults: {style: 'text-align: center'},
				items	: [
					{   dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'출고일자')		, width : 90  , align : 'center'
					},{ dataIndex: 'dlvy_dinv_numb'	, text : Language.get('dlvy_dinv_numb'	,'운송장번호')		, width : 150 , align : 'left'
					},{ dataIndex: 'dlvy_rcpt_hmlf'	, text : Language.get('dlvy_rcpt_hmlf'	,'수화인명')		, width : 250 , align : 'left'
					},{ dataIndex: 'dlvy_tele_numb'	, text : Language.get('dlvy_tele_numb'	,'수화인전화번호')		, width : 150 , align : 'left'
					},{ dataIndex: 'dlvy_hdph_numb'	, text : Language.get('dlvy_hdph_numb'	,'수화인핸드폰번호')	, width : 150 , align : 'left'
					},{ dataIndex: 'dlvy_qntt' 		, text : Language.get('dlvy_qntt'		,'수량')			, width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'dlvy_exps'		, text : Language.get('dlvy_exps'		,'비용')			, width : 100 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'dlvy_brch_name'	, text : Language.get('dlvy_brch_name'	,'배송지점명')		, width : 250 , align : 'left'
					},{ dataIndex: 'hdli_dinv_qntt'	, text : Language.get('hdli_dinv_qntt'	,'발행횟수')		, width : 80  , align : 'right'
					},{ dataIndex: 'dlvy_memo'		, text : Language.get(''				,'비고')			, width : 300 , align : 'left'
					}
				]
			},
			item_sjung = {
				defaults: {style: 'text-align: center'},
				items	: [
					{   dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'출고일자')		, width : 90  , align : 'center'
					},{ dataIndex: 'dlvy_dinv_numb'	, text : Language.get('dlvy_dinv_numb'	,'운송장번호')		, width : 150 , align : 'left'
					},{ dataIndex: 'dlvy_rcpt_hmlf'	, text : Language.get('dlvy_rcpt_hmlf'	,'수화인명')		, width : 250 , align : 'left'
					},{ dataIndex: 'dlvy_tele_numb'	, text : Language.get('dlvy_tele_numb'	,'수화인전화번호')		, width : 120 , align : 'left'
					},{ dataIndex: 'dlvy_hdph_numb'	, text : Language.get('dlvy_hdph_numb'	,'수화인핸드폰번호')	, width : 120 , align : 'left'
					},{ dataIndex: 'dlvy_addr_1fst'	, text : Language.get('dlvy_addr_1fst'	,'수화인주소')		, width : 280 , align : 'left'	
					},{ dataIndex: 'dlvy_qntt' 		, text : Language.get('dlvy_qntt'		,'수량')			, width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'dlvy_exps'		, text : Language.get('dlvy_exps'		,'비용')			, width : 100 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'dlvy_brch_name'	, text : Language.get('dlvy_brch_name'	,'배송지점명')		, width : 200 , align : 'left'						
					},{ dataIndex: 'dlvy_memo'		, text : Language.get(''				,'비고')			, width : 250 , align : 'left'
					}
				]
			}
		;
		return _global.hq_id.toUpperCase()=='N1000SJFLV'? item_sjflv : item_sjung;
	}
});
