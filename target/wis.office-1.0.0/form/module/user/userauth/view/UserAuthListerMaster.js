Ext.define('module.user.userauth.view.UserAuthListerMaster', {extend      : 'Axt.grid.Panel',
	alias		: 'widget.module-userauth-lister-master',
	store		: 'module.user.userauth.store.UserAuthMaster',
	border		: 0,
	columnLines	: true,
	features	: [{ ftype : 'grid-summary', remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],
	initComponent : function () {
		var me = this;
		me.paging = me.pagingItem();
		me.columns= me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var	item = {
			xtype	: 'grid-paging',
			dock	: 'bottom',
			items	: [
				'->','-',
				{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'master', cls : 'button-style' }
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
	var	me = this,
		item = {
			defaults: {style: 'text-align:center'},
			items	: [
				{	text : Language.get('dept_name','근무부서')	, dataIndex: 'dept_name'	, width	: 120
				},{	text : Language.get('user_name','사용자명')	, dataIndex: 'user_name'	, width	: 100 , summaryType : 'count'
				},{	text : Language.get('lgin_idcd','로그인ID')	, dataIndex: 'lgin_idcd'	, width	:  80
				},{	text : Language.get('auth_dvcd','사용권한')	, dataIndex: 'auth_dvcd'	, width	:  90 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('auth_gb'), hidden : true
				}
			]
		};
	return item;
	}
});