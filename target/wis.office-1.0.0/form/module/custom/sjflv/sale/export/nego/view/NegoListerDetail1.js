Ext.define('module.custom.sjflv.sale.export.nego.view.NegoListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-nego-lister-detail1',
	store		: 'module.custom.sjflv.sale.export.nego.store.NegoListerDetail1',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ,{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
	columnLines : true,
	initComponent: function () {
		var me = this;
//		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-' ,

//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style',itemId : 'detail'}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'	,'항번'	) , width :  50 , align : 'center'
					},{ dataIndex: 'iamt_dvcd'		, text : Language.get(''	,'입금구분'		) , width : 120 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{ dataIndex: 'exch_amnt'		, text : Language.get(''	,'입금액'			) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'krwn_amnt'		, text : Language.get(''	,'원화입금액'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'finc_inst_name'	, text : Language.get(''	,'금융기관'		) , width : 100
					},{ dataIndex: 'acct_nmbr'		, text : Language.get(''	,'계좌번호'		) , width : 160
					},{ dataIndex: 'cmsn_amnt'		, text : Language.get(''	,'수수료'			) , width : 100 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'mngt_numb'		, text : Language.get(''	,'입금통보일'		) , width : 100,align:'center'
					},{ dataIndex: 'remk_text'		, text : Language.get(''	,'비고'			) , flex : 1 ,minWidth : 200,align:'center'
					}
				]
			}
		;
		return item;
	}
});