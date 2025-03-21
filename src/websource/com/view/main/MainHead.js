/**
 */
Ext.define('com.view.main.MainHead', { extend:'Ext.container.Container',

	alias  : 'widget.mainhead',
	id     : 'mainhead',
	cls	 : 'dark-back',

	requires: [
	 	'lookup.popup.view.PasswdPopup'
	],

	layout : 'border',
	height : 0,
	border :  0,
	hidden : true,
	items: [
//		{	xtype	: 'component' ,
//			region	: 'west',
//			width	: 190,
//			itemId	: 'login_logo' ,
//			style	: 'background-color:white; border-left: solid #99bce8 1px; border-right: solid #99bce8 1px;',
//			html	: '<img src="resource/img/MOA_Infotech_CI.png" width="188" height="35">'
//		},
		{ layout	:'border',
			region	:'center',
			border	:false ,
			items	: [
				{ 	xtype  : 'toolbar',
					name   : 'setting',
					border : false,
					margin  : '-1 0 0 0',
					region : 'north',
					cls	 : 'dark-back',
					height : 25 ,
					items  : [
						{	xtype: 'tbfill'
						},{	xtype : 'button',
							itemId : 'login_user' ,
							iconCls: 'icon-user' ,
							text : '<span style="text-decoration:underline;"><font color="white">로그아웃</font></span>',
							//handler: function() {
							//	com.app.getApplication().getController('MainHead').doLogout();
							//},
							menu : [
								{	text : '로그아웃',
									name : 'logoutProcess',
									iconCls: 'icon-logout' ,
									handler: function() {
										com.app.getApplication().getController('MainHead').doLogout();
									}
								},{ text : '암호변경',
									name : 'passwdChanging',
									iconCls: 'icon-passwd',
									handler: function() {
										resource.loadPopup({
											widget : 'lookup-passwd-popup',
											method : 'mypasswd',
											apiurl : {
												master : _global.api_host_info+'/system/user/userinfo/set/passwd.do',
											},
											params : {
												hq_id  : _global.hq_id,
//												emp_id   : _global.emp_id,
//												upt_id : _global.emp_id
												emp_id   : _global.login_id,
												upt_id : _global.login_id,
												frc_cd    : _global.frc_cd,
												brd_cd    : _global.brd_cd
											}
										});
									}
							 	}
							]
//						},{ xtype: 'tbseparator'
//						},{
//							xtype   : 'button',
//							iconCls : Const.CONFIG.icon,
//							menu :
//							[
//							 	{
//							 	}
//							]
						}
					]
				},{ xtype  : 'toolbar',
					name   : 'menubar',
					border : false,
					dock   : 'bottom',
					items  : [],
					hidden : true
				}
			 ]
		}
	]

});