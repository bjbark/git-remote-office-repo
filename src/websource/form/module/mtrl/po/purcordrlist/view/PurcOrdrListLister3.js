Ext.define('module.mtrl.po.purcordrlist.view.PurcOrdrListLister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordrlist-lister3'			,
	store		: 'module.mtrl.po.purcordrlist.store.PurcOrdrList3'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_clos'		, text : Language.get('line_clos'		,'마감'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos'), align : 'center'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 150 , align : 'left'
					},{ dataIndex: 'invc_numb'		, text : Language.get('offr_numb'		,'발주번호'		) , width : 120 , align : 'center'					
					},{ dataIndex: 'line_seqn'		, text : Language.get('pcod_seqn'		,'발주항번'		) , width : 60  , align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 90  , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 160 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 160 , align : 'left'
					},{ dataIndex: 'invc_date'		, text : Language.get('offr_date'		,'발주일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'offr_qntt'		, text : Language.get('offr_qntt'		,'발주수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'qntt'			, text : Language.get('upid_baln_qntt'	,'미입고수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'purc_drtr_name'	, text : Language.get('ordr_user_name'	,'발주담당'		) , width : 80  , align : 'center'
					},{ dataIndex: 'supl_dvcd'		, text : Language.get('supl_dvcd'		,'조달구분'		) , width : 90  , xtype : 'lookupcolumn', lookupValue : resource.lookup('supl_dvcd'), align : 'center'	
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});