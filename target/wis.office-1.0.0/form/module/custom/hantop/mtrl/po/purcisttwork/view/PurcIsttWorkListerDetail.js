Ext.define('module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcisttwork-lister-detail',
	store		: 'module.custom.hantop.mtrl.po.purcisttwork.store.PurcIsttWorkDetail',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width : 50  , align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	) , width : 150 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , flex  : 100 , align : 'left'
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 100 , align : 'left'
					},{ dataIndex: 'modl_name'	, text : Language.get('modl_name'	,'모델명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'unit_name'	, text : Language.get('unit_name'	,'단위'		) , width : 60  , align : 'left'
					},{ dataIndex: 'istt_qntt'	, text : Language.get('istt_qntt'	,'수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_pric'	, text : Language.get('istt_pric'	,'단가'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_amnt'	, text : Language.get('istt_amnt'	,'금액'		) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'	, text : Language.get('istt_vatx'	,'부가세'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'orig_invc_numb'	, text : Language.get('orig_invc_numb'	,'발주번호'	) , width : 120 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});