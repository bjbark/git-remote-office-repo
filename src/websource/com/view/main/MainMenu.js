/**
 */
Ext.define( 'com.view.main.MainMenu', { extend: 'Ext.tree.Panel',
	alias	: 'widget.mainmenu',
	id		: 'mainmenu',
	store	: 'main.MainMenu',
//	title	: '메인메뉴' ,
	requires:[
		'com.view.main.MainShop',
		'Axt.data.plugin.TreeFilter'
	],

	plugins: [{
		ptype: 'treefilter',
		allowParentFolders: true
	}],

	width		: 190,
	minWidth	:  20,
	maxWidth	: 300,
	collapsible	: true,
	split		: true,
	rootVisible	: false, // 최상위 node 숨김
	listeners:{
		render:function(){
			var	me = this;
			if(_global.options.barobill_use_yorn && _global.auth.auth_admn_1001){
				me.down('[itemId=barobillmenu]').show();
			}else{
				me.down('[itemId=barobillmenu]').hide();
			}
		}
	},
	tools: [
		{	type: 'plus' , handler: function(event, target, header, tool){ header.ownerCt.expandAll(  function() {}); }},
		{	type: 'minus', handler: function(event, target, header, tool){ header.ownerCt.collapseAll(function() {}); }}
	],
	dockedItems		: [
		{	xtype	: 'toolbar',
			items	: [
				{ action: 'symenu', text: '전체메뉴' },
				{ action: 'mymenu', text: '마이메뉴' }, '-',
				{	text : '기타',
					menu : [
						{	text : '개선요청' , action : 'mantis', },
						{	text : '홈택스', itemId: 'barobillmenu',hidden : (_global.options.barobill_use_yorn),
							menu:[
								{	text : '회원가입'		, action : 'barobillJoin', },
								{	text : '공동인증서등록'	, action : 'barobillCert', }
							]
						}
					]
				},
			]
		},{	xtype		: 'form',
			dock		: 'bottom',
			name		: 'stor_form',
			margin		: '4 0 4 0',
			layout		: {
				type	: 'vbox',
				align	: 'stretch'
			},
			height		: 85 ,
			items		: [
				{	xtype	: 'component' ,
					region	: 'center',
					width	: 190,
					itemId	: 'login_logo' ,
					style	: 'background-color:white; border-left: solid #99bce8 1px; border-right: solid #99bce8 1px;',
//			 		html	: '<img src="resource/img/MOA_Infotech_CI.PNG" width="188" height="60">'
					html	: '<img src="resource/img/' + _global.options.logo_name + '" width="188" height="45">'

				},{	xtype	: 'toolbar',
					name	: 'setting',
					border	: false,
					margin	: '-1 0 0 0',
					region	: 'north',
//					cls	 :	'dark-back',
					height	: 25 ,
					items  : [
						{	xtype	: 'tbfill'
						},{	xtype	: 'button',
							itemId	: 'login_user' ,
							iconCls	: 'icon-user' ,
							text	: '<span style="text-decoration:underline;"><font color="white">로그아웃</font></span>',
							menu : [
								{	text	: '로그아웃',
									name	: 'logoutProcess',
									iconCls	: 'icon-logout' ,
									handler	: function() {
										com.app.getApplication().getController('MainHead').doLogout();
									}
								},{	text	: '암호변경',
									name	: 'passwdChanging',
									iconCls	: 'icon-passwd',
									handler	: function() {
										resource.loadPopup({
											widget	: 'lookup-passwd-popup',
											method	: 'mypasswd',
											apiurl	: {
												master : _global.api_host_info+'/system/user/userinfo/set/passwd.do',
											},
											params		: {
												hq_id	: _global.hq_id,
												emp_id	: _global.login_id,
												upt_id	: _global.login_id,
												frc_cd	: _global.frc_cd,
												brd_cd	: _global.brd_cd
											}
										});
									}
								}
							]
						}
					]
				}
			]
		}
	]
});




