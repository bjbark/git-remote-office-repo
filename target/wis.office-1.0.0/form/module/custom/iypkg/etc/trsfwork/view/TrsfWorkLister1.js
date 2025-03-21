Ext.define('module.custom.iypkg.etc.trsfwork.view.TrsfWorkLister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-trsfwork-lister1',
	store		: 'module.custom.iypkg.etc.trsfwork.store.TrsfWorkLister1',

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

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('cars_numb') == '합계' || record.get('cars_numb') == '월계'){
				return 'text-warn';
			}else if(record.get('cars_numb') == '일계'){
				return 'text-blue';
			}
		}
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
					{	dataIndex: 'cars_numb'		, width: 150, align: 'left'  , text: Language.get('cars_numb'		, '차량번호'		)
					},{	dataIndex: 'invc_date'		, width: 100, align: 'center', text: Language.get('invc_date'		, '운송일자'		)
					},{ dataIndex: 'ostt_cstm'		, width: 170, align: 'left'  , text: Language.get('cstm_name'		, '출고처'			)
					},{ dataIndex: 'ostt_qntt'		, width:  70, align: 'right' , text: Language.get('ostt_qntt'		, '출고수량'		), xtype : 'numericcolumn'
					},{ dataIndex: 'qntt'			, width:  70, align: 'right' , text: Language.get('qntt'			, '배차수량'		), xtype : 'numericcolumn',
					},{ dataIndex: 'totl_mxm2'		, width:  60, align: 'right' , text: Language.get('totl_mxm2'		, '총m2'			), xtype : 'numericcolumn',
					},{ dataIndex: 'trnt_exps'		, width: 100, align: 'right' , text: Language.get('trnt_exps'		, '운송비'			), xtype : 'numericcolumn',
					},{ dataIndex: 'crrr_name'		, width: 100, align: 'left'  , text: Language.get('crrr_name'		, '운송자'			)
					},{ dataIndex: 'need_time'		, width:  80, align: 'center', text: Language.get('need_time'		, '소요시간'		)
					},{ dataIndex: 'ttsm_amnt'		, width: 100, align: 'right' , text: Language.get('ttsm_amnt'		, '매출액'			), xtype : 'numericcolumn',
					}
				]
			}
		;
		return item;
	}
 });
