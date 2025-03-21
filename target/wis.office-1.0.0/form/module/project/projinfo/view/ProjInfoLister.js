Ext.define('module.project.projinfo.view.SiteInfoLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-projinfo-lister',
	store: 'module.project.projinfo.store.ProjInfo',
	columnLines: true ,// 컬럼별 라인 구분
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},//mode : 'SINGLE' MULTI
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
		var me = this, item =
		{
			xtype : 'grid-paging',
			items : [
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
				defaults: {style: 'text-align:center'},
				items :
				[
	         		{ text : '프로젝트'  , dataIndex: 'pjt_nm'      , width : 150 ,
	         			renderer: function (val, meta, record){
	         				var url = record.get('pjt_url');
	         				if (Ext.isEmpty(url)){return val;
	         				} else {
	         					return '<a href="' + (url.match('http://')?url:'http://'+url) + '" style="text-decoration:none" target="_blank">' + val + '</a>' ;
//	         					/return val + ' ' +'<a href="' + (url.match('http://')?url:'http://'+url) + '" target="_blank ">' + '[바로가기]' + '</a>';
	         				}
	         			}
	         		},{ text : '구분'     , dataIndex: 'pjt_gb'      , width : 60,   xtype: 'lookupcolumn' , lookupValue : resource.getList('proj_gb'), align : 'center'
	         		},{ text : '메모사항'  , dataIndex: 'usr_memo'    , flex  :   1
	         		//},{ text : '프로젝트'  , dataIndex: 'proj_cd'      , width : 100
	         		},{ text : '식별코드'  , dataIndex: 'pjt_id'      , width : 100
	         		},{ text : '순서'      , dataIndex: 'row_ord'    , width : 45,   xtype: 'numericolumn'
	         		},{ text : '숨김'      , dataIndex: 'row_sts'    , width : 45,   xtype: 'lookupcolumn' , lookupValue : resource.getList('row_sts'), align : 'center'
	         		}
	         	]
			}
		;
		return item;
	}

});





