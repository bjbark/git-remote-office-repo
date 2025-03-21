Ext.define('module.stock.isos.etcisttwork.view.EtcIsttWorkListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-etcisttwork-lister-master',

	store		: 'module.stock.isos.etcisttwork.store.EtcIsttWorkMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
							{ text : '해지', action : 'closecancleAction' }
						]
					},
					'-', '->', '-',
					{	text : '<span class="write-button">라벨발행</span>'	, action : 'labelAction' , cls: 'button1-style',hidden : _global.hq_id.toUpperCase()!='N1000KOMEC' ? true:false},
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
					{	dataIndex:	'line_clos'			, width:  40, align : 'center' , text: Language.get( 'line_clos'      , '마감'), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'invc_numb'			, width: 100, align : 'center' , text: Language.get( 'istt_numb'      , '전표번호')
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center' , text: Language.get( 'istt_date'      , '입고일자')
					},{	dataIndex:	'istt_wrhs_name'	, width: 120, align : 'left'   , text: Language.get( 'istt_wrhs_name' , '입고창고')
					},{	dataIndex:	'istt_dvcd'			, width:  80, align : 'center' , text: Language.get( 'istt_dvcd'      , '입고구분'), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'istt_dvcd' )
					},{	dataIndex:	'rept_dept_name'	, width: 120, align : 'left'   , text: Language.get( 'rept_dept_name' , '요청부서')
					},{	dataIndex:	'reqt_drtr_name'	, width: 100, align : 'left'   , text: Language.get( 'reqt_drtr_name' , '요청담당')
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'   , text: Language.get( 'cstm_name'      , '입고처명')
					},{	dataIndex:	'proc_dept_name'	, width: 120, align : 'left'   , text: Language.get( 'proc_dept_name' , '처리부서')
					},{	dataIndex:	'proc_drtr_name'	, width: 100, align : 'left'   , text: Language.get( 'proc_drtr_name' , '처리담당')
					},{	dataIndex:	'used_dept_idcd'	, width:  80, align : 'left'   , text: Language.get( 'used_dept_idcd' , '사용부서'), hidden : true
					},{	dataIndex:	'used_dept_name'	, width:  80, align : 'left'   , text: Language.get( 'used_dept_name' , '사용부서')
					},{	dataIndex:	'remk_text'			, width: 150, align : 'left'   , text: Language.get( 'remk_text'      , '비고'), hidden : true
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'   , text: Language.get( 'user_memo'      , '메모')
					}
				]
			};
		return item;
	}
 });
