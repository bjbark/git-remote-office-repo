Ext.define('module.stock.isos.etcosttwork.view.EtcOsttWorkListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-etcosttwork-lister-master',

	store		: 'module.stock.isos.etcosttwork.store.EtcOsttWorkMaster',

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
					{	text   : '마감/해지',
						hidden : !_global.auth.auth_stok_1001,
						menu   : [
							{ text : '마감', action : 'closeAction'       },
							{ text : '해지', action : 'closecancelAction' }
						]
					},
					'-', '->', '-',
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
					{	dataIndex:	'line_clos'			, width:  40, align : 'center' , text: '마감'        , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'invc_numb'			, width: 120, align : 'left'   , text: Language.get( 'ostt_numb'      , '출고번호')
					},{	dataIndex:	'invc_date'			, width:  80, align : 'left'   , text: Language.get( 'ostt_date'      , '출고일자')
					},{	dataIndex:	'cstm_dvcd'			, width: 120, align : 'left'   , text: Language.get( 'cstm_dvcd'      , '출고구분'), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'cstm_dvcd' )
					},{	dataIndex:	'ostt_wrhs_name'	, width:  80, align : 'left'   , text: Language.get( 'ostt_wrhs_name' , '출고창고')
					},{	dataIndex:	'rept_dept_name'	, width: 100, align : 'left'   , text: Language.get( 'rept_dept_name' , '요청부서')
					},{	dataIndex:	'reqt_drtr_name'	, width:  80, align : 'left'   , text: Language.get( 'reqt_drtr_name' , '요청담당')
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'   , text: Language.get( 'cstm_name'      , '출고처명')
					},{	dataIndex:	'proc_dept_name'	, width: 100, align : 'left'   , text: Language.get( 'proc_dept_name' , '처리부서')
					},{	dataIndex:	'proc_drtr_name'	, width:  80, align : 'left'   , text: Language.get( 'proc_drtr_name' , '처리담당')
					},{	dataIndex:	'used_dept_name'	, width: 100, align : 'left'   , text: Language.get( 'used_dept_name' , '사용부서')
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'   , text: Language.get( 'user_memo'      , '메모')
					}
				]
			};
		return item;
	}
 });
