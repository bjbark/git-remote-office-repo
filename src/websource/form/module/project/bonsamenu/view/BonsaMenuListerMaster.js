Ext.define('module.project.bonsamenu.view.BonsaMenuListerMaster', {extend: 'Axt.grid.Panel',
    alias       : 'widget.module-bonsamenu-lister-master',
    store       : 'module.project.bonsamenu.store.BonsaMenuMaster',
    columnLines : true,
	selModel	: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	features    : [{ ftype : 'grid-summary' , remote : true } ],
	plugins 	: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },
    initComponent : function () {
	   var me = this;
	   me.paging = me.pagingItem();
	   me.columns= me.columnItem();
	   me.callParent();
    },
	pagingItem : function () {
		var me = this,
		item = {
			   xtype : 'grid-paging',
//			    dock : 'bottom',
			   items : [
			       '->','-',
			        {text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'master' , cls: 'button-style'}
			   ]
	   };
	   return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
	  var  me = this,
	       item = {
			   defaults: {style: 'text-align:center'},
	           items   : [
	   	           { text : '본사ID'   , dataIndex: 'hq_id'	, width : 100  },
	               { text : '본사명'   	, dataIndex: 'hq_nm'	, width : 100 , summaryType : 'count' },
	               { text : '브랜드'		, dataIndex: 'corp_nm'	, width : 100 },
        		   { text : '상태'		, dataIndex: 'hq_sts'  , width :  75  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('ctrl_sts')}, //readOnly : false,
        		   { text : '버젼'		, dataIndex: 'hq_ver'  , width :  45  , align : 'center' }
	           ]
		  };
	  return item;
   }


});