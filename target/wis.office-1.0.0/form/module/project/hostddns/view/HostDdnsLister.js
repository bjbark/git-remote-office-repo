Ext.define('module.project.hostddns.view.HostDdnsLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-hostddns-lister',
	store: 'module.project.hostddns.store.HostDdns',

	columnLines: true ,// 컬럼별 라인 구분


	selModel 	: { selType: 'checkboxmodel'   , mode : 'SINGLE' },
	features    : [{ ftype : 'grid-summary'    , remote : true } ],
	plugins     : [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },

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
		var me = this, item =
		{
			xtype : 'grid-paging',
			items:
			[
			 	'->', '-' ,
			 	//{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action } ,
			 	{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
			 	{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
   	 		 	//{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , disabled : true}
		    ]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var item = {
			defaults: {style: 'text-align:center'},
	        items : [
       			{	dataIndex: 'site_yn',     	text: Language.get('site_yn',     	''),				width: 120, hidden: true
       			},{	dataIndex: 'ddn_nm',        text: Language.get('ddn_nm',        'Connection Name'),	width: 120,
       			},{	dataIndex: 'ddn_gb',		text: Language.get('ddn_gb',		'Flag'),			width:  40,align: 'center'
       			},{	dataIndex: 'host_ip',       text: Language.get('host ip',        'Host Address'),   width: 100,
       			},{	dataIndex: 'provider',      text: Language.get('provider',      'Provider'),		width:  90,align: 'center'
       			},{	dataIndex: 'host_conn_port',text: Language.get('host_conn_port','Port'),			width:  60,align: 'center'
       			},{	dataIndex: 'host_path',		text: Language.get('host_path',		'Database Name'),	width: 120,
       			},{	dataIndex: 'host_conn_acct',text: Language.get('host_conn_acct','Account'),			width: 120,align: 'center'
       			},{	dataIndex: 'host_conn_pwd',	text: Language.get('host_conn_pwd',	'Password'),		width: 120,
       			},{	dataIndex: 'dhcp_ip',       text: Language.get('dhcp ip',       'Internal Address'),   width: 120,
       			},{	dataIndex: 'pooltime',      text: Language.get('pooltime',      'Pool Time'),		width:  90,align: 'right'
       			},{	dataIndex: 'maxcount',		text: Language.get('maxcount',		'Max Count'),		width:  90,align: 'right'
       			},{	dataIndex: 'host_id',       text: Language.get('host_id',       'Host ID'),			width: 120,
       			},{	dataIndex: 'host_cd',   	text: Language.get('host_cd',   	'Host Code'),		width: 120,
       			},{	dataIndex: 'ddn_id',        text: Language.get('ddn_id',        'Connection ID'),	width: 120,
       			},{	dataIndex: 'ddn_cd',       	text: Language.get('ddn_cd',       	'Connection Code'),	width: 120,
       			},{	dataIndex: 'protocol',     	text: Language.get('protocol',     	'Protocol'),		width:  90,align: 'center'
       			},{	dataIndex: 'usr_memo',      text: Language.get('usr_memo',      'Memo'),			flex:    1,
       			},{	dataIndex: 'row_sts',  		text: Language.get('row_sts',  		'Status'),			width:  60,
       			}
	        ]
		};
		return item;
	}
});





