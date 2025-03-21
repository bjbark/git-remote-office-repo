Ext.define('module.mtrl.po.poplan.view.PoPlanListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-poplan-lister-master1',
	store		: 'module.mtrl.po.poplan.store.PoPlanMaster1'	,

	selModel	: { selType: 'checkboxmodel', mode : 'MULTE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">발주실행</span>'	, action : 'orderAction'	, cls: 'button1-style'	} , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				],
				pagingButton : false
			}
		;
		return item;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'	, text : Language.get('','주문번호'		) , width : 80  , align : 'center'
					},{ dataIndex: 'acpt_case_name'	, text : Language.get('','주문명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'cstm_name'	, text : Language.get('','거래처명'		) , width : 200 , align : 'left'
					},{ dataIndex: 'invc_date'	, text : Language.get('','등록일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'line_seqn'	, text : Language.get('','항번'		) , width : 50  , align : 'center'
					},{ dataIndex: 'item_code'	, text : Language.get('','품목코드'		) , width : 80  , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('' ,'품명'		) , width : 300 , align : 'left'
					},{ dataIndex: 'item_spec'	, text : Language.get('' ,'규격'		) , width : 200 , align : 'left'
					},{ dataIndex: 'invc_qntt'	, text : Language.get('' ,'수량'		) , width : 50  , align : 'right', xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'invc_pric'	, text : Language.get('' ,'단가'		) , width : 80  , align : 'right', xtype: 'numericcolumn'
					},{ dataIndex: 'invc_amnt'	, text : Language.get('' ,'금액'		) , width : 100  , align : 'right', xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get('' ,'부가세'		) , width : 80  , align : 'right', xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'deli_date'	, text : Language.get('' ,'납기일자'	) , width : 90  , align : 'center'
					},{ dataIndex: 'bom_yorn'	, text : Language.get('' ,'BOM'			) , width : 50  , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'ndqt_yorn'	, text : Language.get('' ,'소요량계산여부'	) , width : 90  , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'offr_yorn'	, text : Language.get('' ,'발주여부'		) , width  : 80 , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					}
				]
			}
		;
		return item;
	}
});