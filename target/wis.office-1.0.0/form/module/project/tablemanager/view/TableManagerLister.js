Ext.define('module.project.tablemanager.view.TableManagerLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-tablemanager-lister',
	store: 'module.project.tablemanager.store.TableManager',
	columnLines: true ,
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},

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
				{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
				{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
				{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
				{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
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
				items	: [
					{	dataIndex: 'fied_seqn'		, width:  50, text: '순번'
					},{	dataIndex: 'engl_fied_name'	, width: 120, text: '필드ID'	, align: 'left'
					},{	dataIndex: 'fied_name'		, width: 120, text: '필드명'		, align: 'left' , hidden : true
					},{	dataIndex: 'disp_fied_name'	, width: 120, text: '필드명'		, align: 'left'
					},{	dataIndex: 'tabl_name'		, width: 110, text: '테이블명'	, align: 'left' , hidden : true
					},{	dataIndex: 'data_type'		, width:  80, text: '타입'
					},{	dataIndex: 'data_leng'		, width:  40, text: '길이'
					},{	dataIndex: 'key_dvcd'		, width:  50, text: '키여부'
					},{	dataIndex: 'null_dvcd'		, width:  60, text: 'null허용'
					},{	dataIndex: 'dflt_valu'		, width:  60, text: '기본값'
					},{	dataIndex: 'code_desc'		, width: 380, text: '내부코드'	, align: 'left'
					},{	dataIndex: 'word_1'			, width:  70, text: '단어명1'
					},{	dataIndex: 'engl_word_1'	, width:  60, text: '코드1'
					},{	dataIndex: 'word_2'			, width:  70, text: '단어명2'
					},{	dataIndex: 'engl_word_2'	, width:  60, text: '코드2'
					},{	dataIndex: 'word_3'			, width:  70, text: '단어명3'
					},{	dataIndex: 'engl_word_3'	, width:  60, text: '코드3'
					},{	dataIndex: 'word_4'			, width:  70, text: '단어명4'
					},{	dataIndex: 'engl_word_4'	, width:  60, text: '코드4'
					},{	dataIndex: 'word_5'			, width:  70, text: '단어명5'
					},{	dataIndex: 'engl_word_5'	, width:  60, text: '코드5'
					},{	dataIndex: 'word_6'			, width:  70, text: '단어명6'
					},{	dataIndex: 'engl_word_6'	, width:  60, text: '코드6'
					}
				]
			}
		;
		return item;
	}
});





