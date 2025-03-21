Ext.define('module.project.tablemanagerv2.view.TableManagerV2Lister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-tablemanagerv2-lister',
	store: 'module.project.tablemanagerv2.store.TableManagerV2',
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
					{	dataIndex: 'fied_seqn'		, width:  35, text: 'Seq'
					},{	dataIndex: 'engl_fied_name'	, width: 120, text: 'Field Name'	, align: 'left'
					},{	dataIndex: 'fied_name'		, width: 120, text: 'Field Comment'		, align: 'left' , hidden : true
					},{	dataIndex: 'disp_fied_name'	, width: 120, text: 'Field Comment'		, align: 'left'
					},{	dataIndex: 'tabl_name'		, width: 110, text: '테이블명'	, align: 'left' , hidden : true
					},{	dataIndex: 'data_type'		, width:  80, text: 'Type'
					},{	dataIndex: 'data_leng'		, width:  40, text: '길이', hidden: true
					},{	dataIndex: 'key_dvcd'		, width:  35, text: 'Key'
					},{	dataIndex: 'null_dvcd'		, width:  35, text: 'null'
					},{	dataIndex: 'dflt_valu'		, width:  60, text: 'Default'
					},{	dataIndex: 'code_desc'		, flex : 380, text: '내부코드(sccd_mast)'	, align: 'left'
					},{	dataIndex: 'locl_remk'		, width: 180, text: 'Comment in Table'	, align: 'left'
					},{	dataIndex: 'comm_remk'		, width: 200, text: 'Common Comment '	, align: 'left'
					},{	dataIndex: 'word_1'			, width:  70, text: '단어명1', hidden : true
					},{	dataIndex: 'engl_word_1'	, width:  60, text: '코드1', hidden : true
					},{	dataIndex: 'word_2'			, width:  70, text: '단어명2', hidden : true
					},{	dataIndex: 'engl_word_2'	, width:  60, text: '코드2', hidden : true
					},{	dataIndex: 'word_3'			, width:  70, text: '단어명3', hidden : true
					},{	dataIndex: 'engl_word_3'	, width:  60, text: '코드3', hidden : true
					},{	dataIndex: 'word_4'			, width:  70, text: '단어명4', hidden : true
					},{	dataIndex: 'engl_word_4'	, width:  60, text: '코드4', hidden : true
					},{	dataIndex: 'word_5'			, width:  70, text: '단어명5', hidden : true
					},{	dataIndex: 'engl_word_5'	, width:  60, text: '코드5', hidden : true
					},{	dataIndex: 'word_6'			, width:  70, text: '단어명6', hidden : true
					},{	dataIndex: 'engl_word_6'	, width:  60, text: '코드6', hidden : true
					}
				]
			}
		;
		return item;
	}
});





