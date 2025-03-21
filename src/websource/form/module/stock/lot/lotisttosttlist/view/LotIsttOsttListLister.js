Ext.define('module.stock.lot.lotisttosttlist.view.LotIsttOsttListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lotisttosttlist-lister',
	store		: 'module.stock.lot.lotisttosttlist.store.LotIsttOsttList',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
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
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'		,'창고명'	), width : 100, align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	), width : 100, align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'	), width : 200,
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'	), width : 200,
					},{	dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명'	), width : 200, hidden:_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false
					},{	dataIndex: 'acct_bacd_name'	, text : Language.get('acct_bacd'		,'계정분류'	), width :  80, align : 'left'
					},{	dataIndex: 'unit_name'		, text : Language.get(''				,'기준단위'	), width :  70, align : 'center'
					},{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'), width : 120,
					},{	dataIndex: 'make_date'		, text : Language.get(''				,'제조일자'	), width :  80, hidden:_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false : true
					},{	dataIndex: 'rtil_ddln_date'	, text : Language.get(''				,'유통기한'	), width :  80, hidden:_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false : true
					},{ dataIndex: 'invc_date'		, text : Language.get(''				,'수불일자'	), width :  90, align : 'center'
					},{ dataIndex: 'isos_dvcd'		, text : Language.get(''				,'수불구분'	), width :  60, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('isos_dvcd')
					},{ dataIndex: 'cstm_name'		, text : Language.get(''				,'거래처명'	), width : 100, align : 'left', hidden:_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false : true
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'	), width : 100, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.####':'#,##0.##9',
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'출고수량'	), width : 100, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.####':'#,##0.##9',
					},{ dataIndex: 'full_invc_numb'	, text : Language.get('full_invc_numb'	,'수불근거'	), width : 150, align : 'left', hidden: _global.hq_id.toUpperCase() == 'N1000KOMEC' ? true : false,
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'메모사항'	), flex  :   1, align : 'left'
					}
				]
			}
		;
		return item;
	 }

});
