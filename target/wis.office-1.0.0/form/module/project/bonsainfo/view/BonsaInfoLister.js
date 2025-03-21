Ext.define('module.project.bonsainfo.view.BonsaInfoLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-bonsainfo-lister',
	store: 'module.project.bonsainfo.store.BonsaInfo',

	columnLines: true ,

	selModel	: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	features    : [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style'
					},{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'
					}
				]
			};
		return item ;
	},

	columnItem : function () {
		var item = {
			defaults: {style: 'text-align:center'},
	        items : [
 	         	{	text : '본사ID'   , dataIndex: 'hq_id'   , width : 100
	         	},{ text : '본사명'   , dataIndex: 'hq_nm'   , width : 150 , summaryType : 'count'
	         	},{ text : '청약일자' , dataIndex: 'bonsa_dt', width :  80  , align : 'center'
	         	},{ text : '청약상태' , dataIndex: 'hq_sts' , width :  60  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('ctrl_sts'), align : 'center'
	         	},{ text : '청약구분' , dataIndex: 'hq_gb'  , width :  70  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('hq_gb' )
	         	},{ text : '버젼'     , dataIndex: 'hq_ver' , width :  45  , align : 'center'
	         	},{ text : '청약건수' , dataIndex: 'contr_cnts' , width :  70   , xtype : 'numericolumn' , summaryType : 'sum' , font_color : 'green'
	         	},{ text : '개통건수' , dataIndex: 'contr_1000' , width :  70   , xtype : 'numericolumn' , summaryType : 'sum' , font_color : 'blue'
	         	},{ text : '미납정지' , dataIndex: 'contr_2000' , width :  70   , xtype : 'numericolumn' , summaryType : 'sum'
	         	},{ text : '일시정지' , dataIndex: 'contr_2500' , width :  70   , xtype : 'numericolumn' , summaryType : 'sum'
	         	},{ text : '해지건수' , dataIndex: 'contr_3000' , width :  70   , xtype : 'numericolumn' , summaryType : 'sum' , font_color : 'red'
	         	},{ text : '기타건수' , dataIndex: 'contr_etcs' , width :  70   , xtype : 'numericolumn' , summaryType : 'sum'
	         	},{ text : '오라클'   , dataIndex: 'pos_hostanem'   , width :  110
	         	},{ text : '최근수신일', dataIndex: 'last_read_dt'   , width :  80
	         	},{ text : '최종매출일', dataIndex: 'last_sale_dt'   , width :  80
	         	},{  text: '메모사항'  , dataIndex: 'usr_memo' , flex : 1
	         	},{ text : '로고'     , dataIndex: 'logo_url'  , width : 95 ,
	      			renderer: function(value){
	      				return '<img src="' + value + '" height="13" width="80" />';
	      			 }
	         	}
	        ]
		};
		return item;
	}


});

