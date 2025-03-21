Ext.define('module.project.storeinfo.view.StoreInfoLister', { extend: 'Axt.grid.Panel',


	alias: 'widget.module-storeinfo-lister',
	store: 'module.project.storeinfo.store.StoreInfo',
	columnLines: true ,

	selModel: {	selType: 'checkboxmodel', mode : 'MULTI'},
    plugins: [{ptype :'cellediting' , clicksToEdit: 1 }],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this, item =
		{
			xtype : 'grid-paging',
			items: [
			 	{ text: '부가 서비스 정보'	, iconCls: Const.CONFIG.icon , action : 'traderAction' },'-',
	   	 	 	{ text: '관리자 사이트 연결'	, iconCls: 'icon-hyperlink' , action : 'officeAccess' },'-',
	   	 	 	{ text: '설정 확인 접속'	, iconCls: 'icon-hyperlink' , action : 'cloudAccess' },'-',
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
			items : [
				{ text : '청약코드'	, dataIndex: 'ctrl_id'		, width : 140 },
				{ text : '청약명칭'	, dataIndex: 'ctrl_nm'		, width : 170 },
				{ text : '실매장명'	, dataIndex: 'stor_nm'		, width : 170 },
				{ text : '청약일자'	, dataIndex: 'rqust_dt'		, width :  80  , align : 'center' },
				{ text : '본사상태'	, dataIndex: 'hq_sts'		, width :  60  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rqust_sts'), align : 'center' },
				{ text : '청약상태'	, dataIndex: 'rqust_sts'	, width :  60  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rqust_sts'), align : 'center' },
				{ text : '청약구분'	, dataIndex: 'rqust_gb'		, width :  70  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rqust_gb' ), align : 'center' },
				{ text : '청약유형'	, dataIndex: 'stor_grp'		, width :  55  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('stor_grp' ), align : 'center' },
				{ text : '영업채널'	, dataIndex: 'distr_nm'		, width : 100 },
				{ text : '관리채널'	, dataIndex: 'mngt_chnl_nm'	, width : 100 },
				{ text : '콜센터'		, dataIndex: 'phone_nm'		, width : 100 },
				{ text : '매출고객'	, dataIndex: 'chrg_nm'		, width : 150 },
				{ text : '고객상태'	, dataIndex: 'trns_sts'		, width :  60  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('trns_sts' ), align : 'center' },
				{ text : '계약내용'	, dataIndex: 'cont_cont'	, width : 200 },
				{ text : '사업자번호'	, dataIndex: 'biz_no'		, width : 100 },
				{ text : '대표자'		, dataIndex: 'biz_owner'	, width :  60 },
				{ text : '전화번호'	, dataIndex: 'biz_tel_no'	, width : 100 },
				{ text : '팩스'		, dataIndex: 'biz_fax_no'	, width : 100 },
				{ text : '주소'		, dataIndex: 'biz_addr_1'	, width : 200 ,
					renderer: function (val, meta, record){
						var url = record.get('map_url');
						if (Ext.isEmpty(url)) { return val;
						} else {
							return '<a href="' + (url.match('http://')?url:'http://'+url) + '" style="text-decoration:none" target="_blank ">' + val + '</a>' ;
						}
					}
				},
				{ text : '메인연동'   , dataIndex: 'sys_clnt_reg_yn'  , width :  60  , xtype : 'lookupcolumn' , lookupValue : [['0', '' ], ['1', '메인연동'] ], align : 'center' },
				{ text : '최근수신일'   , dataIndex: 'last_read_dt'   , width :  80 } ,
				{ text : '최종매출일'   , dataIndex: 'last_sale_dt'   , width :  80 }
			]
		};
		return item;
	}
});





