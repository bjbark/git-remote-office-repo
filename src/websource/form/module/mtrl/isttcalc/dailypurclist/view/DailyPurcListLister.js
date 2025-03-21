Ext.define('module.mtrl.isttcalc.dailypurclist.view.DailyPurcListLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-dailypurclist-lister',
	store		: 'module.mtrl.isttcalc.dailypurclist.store.DailyPurcList',
	border		: 0,
	columnLines	: true,
//	selModel	: { selType: 'checkboxmodel', mode : 'MULIT' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '2'){
				return 'text-green';
			}else if(record.get('rnum') == '3'){
				return 'text-blue';
			}else if(record.get('rnum') == '4' || record.get('rnum') == '5'){
				return 'text-warn';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : '<span class="write-button">인쇄</span>', action : 'previewAction' , cls: 'button1-style',hidden : false	} , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				], pagingButton : false,
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'invc_date'			, width: 90, align : 'center' ,	text: Language.get( ''			, '입고일자'	)
					},{	dataIndex:	'cstm_name'			, width: 200, align : 'left' ,	text: Language.get( 'cstm_name'	, '거래처명'	)
					},{	dataIndex:	'item_code'			, width: 90, align : 'center',	text: Language.get( 'item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'			, width: 250, align : 'left' ,	text: Language.get( 'item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 220, align : 'left' ,	text: Language.get( 'item_spec'	, '규격'		)
					},{	dataIndex:	'qntt'				, width: 80, align : 'right',	text: Language.get( 'carr_amnt'	, '입고수량'	), xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0'
					},{	dataIndex:	'pric'				, width: 100, align : 'right',	text: Language.get( 'befr_pric'	, '단가'		), xtype : 'numericcolumn'
					},{	dataIndex:	'sply_amnt'			, width: 130, align : 'right',	text: Language.get( ''			, '공급가액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'vatx_amnt'			, width: 130, align : 'right',	text: Language.get( ''			, '부가세'	), xtype : 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'			, width: 150, align : 'right',	text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'user_memo'			, flex: 1,	  align : 'left' ,	text: Language.get( 'user_memo'	, '비고'		)
					},{ dataIndex: ''					, text : Language.get(''		,''			) , width :0
					}
				]
			};
		return item;
	}
 });