Ext.define('module.project.tablemanagerv2.view.TableManagerV2ListerMaster', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-tablemanagerv2-lister-master',
	store: 'module.project.tablemanagerv2.store.TableManagerV2Master',
	columnLines: true ,
	selModel: {	selType: 'checkboxmodel', mode : 'MULTI'},

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
		var me		= this,
			item	= {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						fieldLabel	: '본사',
						name		: 'hqof_name',
						labelAlign	: 'right',
						labelWidth	: 59,
						width		: 200,
						allowBlank	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-bonsa-popup',
							params	: { hq_sts : ['1000' ] , group_yn : '1' , row_sts : 0 }, // stor_id : _global.stor_id,
							result	:  function(records, nameField, pairField ){
								nameField.setValue(records[0].get('hq_nm'));
								me.down('[name=hqof_idcd]').setValue(records[0].get('hq_id'));
							}
						}
					},{	fieldLabel	: 'DB 명',
						xtype		: 'textfield',
						name		: 'table_schema'  ,
						labelAlign	: 'right',
						labelWidth	: 40,
						width		: 120,
						hidden		: true
					},{	xtype		: 'textfield',
						name		: 'hqof_idcd'  ,
						hidden		: true
					},{text : '테이블 작성'	, action : 'tableCreate' , cls: 'button-style'}
					, '-' ,
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
					{	dataIndex : 'table_schema'	, width : 100 , text : 'DB명'		, align : 'left' , hidden : true
					},{	dataIndex : 'table_name'	, width : 100 , text : 'Table ID'	, align : 'left'
					},{	dataIndex : 'table_comment'	, width : 180 , text : 'Table Name'	, align : 'left'
					},{	dataIndex : 'table_rows'	, width :  50 , text : 'Rows'		, align : 'right', xtype : 'numericcolumn'
					},{	dataIndex : 'data_length'	, width :  60 , text : 'Length'		, align : 'right', xtype : 'numericcolumn'
					},{	dataIndex : 'create_time'	, width : 130 , text : 'Date of insert'		, align : 'left'
					},{	dataIndex : 'update_time'	, width : 130 , text : 'Date of change'		, align : 'left'

					}
				]
			}
		;
		return item;
	}
});





