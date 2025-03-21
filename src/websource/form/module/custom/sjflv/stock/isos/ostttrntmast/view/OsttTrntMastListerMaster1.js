Ext.define('module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-ostttrntmast-lister-master1',
	store		: 'module.custom.sjflv.stock.isos.ostttrntmast.store.OsttTrntMastMaster1',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					'-', '->', '-',
					{	text : '<span class="write-button">운송비 추가</span>', action : 'trntInsertAction'	, cls: 'button-style'  ,width:80 },
					{	text : '<span class="write-button">운송비 수정</span>', action : 'trntUpdateAction'	, cls: 'button-style'  ,width:80 },
					{	text : '<span class="write-button">운송비 삭제</span>' , action : 'trntDeleteAction'	, cls: 'button-style'  ,width:80 },
					{	text : '<span class="write-button">송장번호 업로드</span>', action : 'trntUploadAction', cls: 'button-style'  ,width:90 },
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId : 'master'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'ostt_yorn'		, text : Language.get(''				,'출고유형'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : [[1,'제품출고'],[0,'기타출고']]
					},{	dataIndex: 'dlvy_dinv_numb'	, text : Language.get(''				,'출고번호'		) , width : 130 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 150
					},{ dataIndex: 'dlvy_cstm_name'	, text : Language.get('dlvy_cstm_name'	,'납품처명'		) , width : 130
					},{ dataIndex: 'invc_date'		, text : Language.get('shpm_date'		,'출고일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'출고담당'		) , width : 100
					},{ dataIndex: 'dlvy_mthd_dvcd'	, text : Language.get('dlvy_mthd_dvcd'	,'운송방법'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('ostt_trnt_dvcd')
					},{ dataIndex: 'hdco_name' 		, text : Language.get('hdco_name'		,'운송택배사'	) , width : 80  , align : 'center'
					},{ dataIndex: 'dlvy_exps'		, text : Language.get('dlvy_exps'		,'운송비용'		) , width : 80  , align : 'right' , xtype : 'numericcolumn', summaryType : 'sum' , format: '#,##0'
					},{ dataIndex: 'dlvy_taxn_yorn'	, text : Language.get('dlvy_taxn_yorn'	,'부가세포함'	) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'dlvy_memo'		, text : Language.get(''				,'운송비고'		) , width : 120 ,
					},{ dataIndex: 'ostt_item_list'	, text : Language.get(''				,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});