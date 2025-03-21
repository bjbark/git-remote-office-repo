Ext.define('module.project.tablemanagerv2.view.TableManagerV2ListerDomain', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-tablemanagerv2-lister-domain',
	store		: 'module.project.tablemanagerv2.store.TableManagerV2Domain',
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel'	, mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'		, remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' }	, { ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
			xtype : 'grid-paging',
			items: [
				'->', '-' ,
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style'},
				{text : Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action, cls: 'button-style' },
				{text : Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align:center', align: 'center'},
				items : [
					{	dataIndex: 'fied_idcd'    , width: 120, text: '필드ID'	, align: 'left', hidden : true
					},{	dataIndex: 'engl_fied_name', width: 120, text: '필드명'	, align: 'left'
					},{	dataIndex: 'fied_name'    , width: 120, text: '필드명'	, align: 'left'
					},{	dataIndex: 'tabl_name'    , width: 110, text: '테이블명'	, align: 'left', hidden : true
					},{	dataIndex: 'dmin_name'    , width:  80, text: '도메인'
					},{	dataIndex: 'data_type'    , width:  80, text: '타입'
					},{	dataIndex: 'data_leng'    , width:  40, text: '길이'
					},{	dataIndex: 'fied_desc'    , width: 380, text: '참조설명'	, align: 'left'
					},{	dataIndex: 'code_desc'    , width: 380, text: '내부코드'	, align: 'left'
					},{	dataIndex: 'word_1'       , width:  70, text: '단어명1'
					},{	dataIndex: 'engl_word_1'  , width:  60, text: '코드1'
					},{	dataIndex: 'word_2'       , width: 100, text: '단어명2'
					},{	dataIndex: 'engl_word_2'  , width:  60, text: '코드2'
					},{	dataIndex: 'word_3'       , width: 100, text: '단어명3'
					},{	dataIndex: 'engl_word_3'  , width:  60, text: '코드3'
					},{	dataIndex: 'word_4'       , width: 100, text: '단어명4'
					},{	dataIndex: 'engl_word_4'  , width:  60, text: '코드4'
					},{	dataIndex: 'word_5'       , width: 100, text: '단어명5'
					},{	dataIndex: 'engl_word_5'  , width:  60, text: '코드5'
					}
				]
			}
		;
		return item;
	}
});





