Ext.define('module.project.hostinfo.view.HostInfoLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-hostinfo-lister',
	store: 'module.project.hostinfo.store.HostInfo',

	columnLines: true ,

	selModel	: { selType: 'checkboxmodel'   ,  mode : 'MULTI' },
	features    : [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } , '-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
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
			items	: [
				{	text : 'Host Code'  		, dataIndex: 'host_cd' , width : 110 , align : 'center' },
				{	text : 'Host Name'  		, dataIndex: 'host_nm' , width : 200 },
				{	text : 'Operating System'	, dataIndex: 'host_os' , width : 140 , xtype : 'lookupcolumn' , lookupValue : resource.getList('server_os' ) , align : 'center' },
				{	text : '담당자'				, dataIndex: 'emp_nm'  , width :  60 , align : 'center' },
				{	text : 'Location'			, dataIndex: 'host_gb' , width :  80 , xtype : 'lookupcolumn' , lookupValue : resource.getList('server_gb' ) , align : 'center' },
				{	text : 'IP Address'			, dataIndex: 'host_ip' , width : 150 , align : 'center' },
				{	text : 'Local IP'			, dataIndex: 'dhcp_ip' , width : 150 , align : 'center' },
				{	text : '구매일자/경과일자'		, dataIndex: 'pur_dt'  , width : 170 , align : 'center' ,
					renderer: function(val, meta, record) {
						var nowdate = new Date(),
							valdate = new Date(val),
							gapdate = Math.floor( (nowdate.getTime() - valdate.getTime()) /(1000*60*60*24)),
							year, month, day, renday
						;
						if (gapdate < 30) {
							year  = '00';
							month = '00';
							day   = '00' + gapdate;
						} else if (gapdate < 365) {
							year  = '00' ;
							month = '00' + (Math.floor(gapdate/30));
							day   = '00' + (gapdate - (month * 30));
						} else {
							year  = '00' + (Math.floor(gapdate/365));
							month = '00' + (Math.floor((gapdate-(year*365))/30)) ;
							day   = '00' + (gapdate - (year*365) - (month*30));
						}
						renday = val + ' [' +  year.substring(year.length-2) + '년' + month.substring(month.length-2) + '개월' + day.substring(day.length-2) + '일]' ;

						if (gapdate > 1825) {
							return '<span style="color:red;">'+ renday +'</span>';
						} else if (gapdate > 1095) {
							return '<span style="color:HotPink;">'+ renday +'</span>';
						} else {
							return '<span style="color:blue;">'+ renday +'</span>';
						}
					}
				},
				{	text : 'Model'      , dataIndex: 'prod_model' , width : 100   },
				{	text : 'Serial No'   , dataIndex: 'srl_no' , width : 250  },

				{	text: 'Memo'    , dataIndex: 'usr_memo' , flex : 1 },

				{	text : 'DDNS' , dataIndex: 'host_count' , width :  60   , xtype : 'numericolumn'  } ,

				{	text : 'Status' , dataIndex: 'row_sts'  , width   : 50 , xtype: 'lookupcolumn' , lookupValue : resource.getList('row_sts'), align : 'center' }
			]
		};
		return item;
	}

});





