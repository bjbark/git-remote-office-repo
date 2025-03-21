/**
 * MainMenu 컨트롤러
 */
//var debug = true;
Ext.define('com.controller.MainMenu', { extend:'Ext.app.Controller',
	stores	: ['main.MainMenu'],
	views	: ['main.MainMenu'],

	refs	: [
	 	{ref: 'viewport', selector: 'viewport' },
	 	{ref: 'mainForm', selector: 'mainform' },
	 	{ref: 'mainHead', selector: 'mainhead' },
	 	{ref: 'menuTree', selector: 'mainmenu' }

	],
	requires : [
		'lookup.popup.view.BzplPopup',
	],
	init: function() {
		this.control({
			'mainmenu': {
				load      : this.onMenuLoad,
				itemclick : this.onMenuItemclick,
				itemcontextmenu : this.itemContextMenu,
				itemexpand : this.itemexpandMyMenu
			},

			'mainmenu button[action=symenu]' : { click : this.clickSymenu }, // 전체메뉴 클릭
			'mainmenu button[action=mymenu]' : { click : this.clickMymenu },  // 마이메뉴 클릭
			'mainmenu menuitem[action=mantis]' : { click : this.clickMantis },  // 멘티스 클릭
			'mainmenu menuitem[action=barobillJoin]' : { click : this.clickBarobillJoin },  // 바로빌 가입
			'mainmenu menuitem[action=barobillCert]' : { click : this.clickBarobillCert }   // 바로빌 공동인증서 등록
		});
	},
	/**
	 * 메뉴 load시 브라우저 url에 해당 메뉴를 조회하여 tab에 추가한다.
	 */
	onMenuLoad: function(treeStore, node, records, successful, eOpts) {
		var me = this,
 			menutool = me.getMainHead()
 		;

		/* MainHead.js(view)의 toolbar에 좌측 메인메뉴의 최상위 folder name을 text로 해서 버튼 생성 */
		var mainHeadToolbar = Ext.ComponentQuery.query('#mainhead [name=menubar]')[0];
		var menuTemp = [];
		for(var index in records) {
			var record = records[index];
			var button = { text: record.getData().text,  action: 'onToolbarButtonClick', data:record };
			menuTemp.push(button);
		}
		mainHeadToolbar.add(menuTemp);

		var me = this,
			token = window.location.hash.substr(1)
		;

		if (token && token.indexOf("!") !== 0) { return; }

		var id = token.substr(1);
		var node = treeStore.getNodeById(id);

//		if (!node || !node.isLeaf()) { return;}
//			this.expandParent(node); // 모든 상위 노드 펼침
//
//			// 트리 선택 효과
//			var tree = this.getMenuTree();
//			tree.getSelectionModel().select(node);
//
//			try{ me.addNewTab(node); // 화면탭 추가
//			} catch (e) { console.debug('exception', e); }

		if (!node || !node.isLeaf()) {
		} else {
			this.expandParent(node); // 모든 상위 노드 펼침

			// 트리 선택 효과
			var tree = this.getMenuTree();
			tree.getSelectionModel().select(node);

			try{ me.addNewTab(node); // 화면탭 추가
			} catch (e) { console.debug('exception', e); }
		}
		// 본죽 공지사항을 강제로 표시하기 위해 아래와 같이 강제 코딩하였다....
		// 메뉴 아이디가 변경된 경우 반드시 변경해 줘야 한다....

		if  (_global.hq_id == 'N1000BONIF') {
			var progId = '14884';
			var isForm = true;
			var tabcontrol = this.getMainForm(),
				tab = tabcontrol.getComponent(progId),
				tabcount = tabcontrol.items.getCount();
			console.debug('tabcount', tabcount);
			if ((!tab) && tabcount==0) {
				var title      =   'Home';
				var iconCls    =   '';
				var loadergb   =  1 ;
				var permitno   =  0 ;
				var moduleid   =  'cham';
				var modulenm   =  'HomeViewer';
				var packageName = 'module.' + moduleid + '.' + modulenm.toLowerCase();
				var controlName = packageName + '.' + modulenm ;
				var defaultView = packageName + '.view.' + modulenm + 'Layout' ;

				var controller = this.application.getController(controlName); //getController(packageName, controlName, modulename);

				if (controller.views.length === 0) {
					alert('에러 : 설정된 view가 없습니다.');
					return;
				};
				// 동적 패널 추가
				tab = Ext.create(defaultView, {
					title: title,
					itemId: progId,
					closable: true,
					iconCls: iconCls,
					controlName : controlName,
					dockedItems: [{xtype: 'toolbar', dock: 'bottom', hidden : true }]
				});

				tabcontrol.add(tab);
				controller.initPermission(tab, permitno); //initToolbar(tab);
	            controller.initKeyMap();
			}
		}
	},

	/**
	 * 모든 상위 node를 펼침(expand) 상태로 변경
	 *
	 * @param {Ext.data.NodeInterface} node
	 */
	expandParent: function(node) {
		var parent = node.parentNode;
		if (parent && parent.isExpandable()) {
			parent.expand();
			this.expandParent(parent); // recursive call
		}
	},


	/**
	 * 메뉴 선택 이벤트
	 */
	onMenuItemclick: function(view, record, item, index, e) {
		this.addNewTab(record);
	},
	/**
	 * 탭추가
	 *
	 * @param {} id
	 * @param {} text
	 */
	addNewTab: function(record) {
		var me = this;

		var progId = record.get('id');
		var isForm = record.get('leaf');

		if (!isForm || !progId) { // 트리의 상위 노드도 이벤트가 발생하므로 progId가 있을 경우만 실행
			return;
		} else {
			var tabcontrol = this.getMainForm(), tab = tabcontrol.getComponent(progId), tabcount = tabcontrol.items.getCount();
			if (!tab) {
				var title      =   record.get('text');
				var iconCls    =   record.get('iconCls');

				var loadergb   =  record.raw.resource.loader_gb ;
				var permitno   =  record.raw.resource.permit_no ;
				var moduleid   =  record.raw.resource.modl_id || 'unknown';
				var modulenm   =  record.raw.resource.modl_nm || 'unknown';
				var packageName = 'module.' + moduleid + '.' + modulenm.toLowerCase();
				var controlName = packageName + '.' + modulenm ;
				var defaultView = packageName + '.view.' + modulenm + 'Layout' ;

				var controller = this.application.getController(controlName); //getController(packageName, controlName, modulename);
				if (controller.views.length === 0) {
					alert('에러 : 설정된 view가 없습니다.');
					return;
				};
				// 동적 패널 추가
				tab = Ext.create(defaultView, {
					title: title,
					itemId: progId,
					closable: true,
					iconCls: iconCls,
					controlName : controlName,
					dockedItems: [{xtype: 'toolbar', dock: 'bottom', hidden : true }]
				});

				tabcontrol.add(tab);
				controller.initPermission(tab, permitno); //initToolbar(tab);
                controller.initKeyMap();
			}
			tabcontrol.setActiveTab(tab); // tab focus
			tabcontrol.addTabContext(tab.itemId, tab.title, tab.iconCls);
		}

	},

	mainMenuViewType : 'symenu', // symenu : 전체메뉴, mymenu : 마이메뉴

	/**
	 * 전체메뉴 클릭
	 */
	clickSymenu : function (btnObj) {
		var me = this;
		var mainMenuTree = me.getMenuTree();
		var mainMenuStore = me.getStore('main.MainMenu');
		mainMenuTree.clearFilter();
		me.mainMenuViewType = 'symenu';
	},

	/**
	 * 마이메뉴 클릭
	 */
	clickMymenu : function (btnObj) {
		var me = this;
		me.filterMyMenu();
		me.mainMenuViewType = 'mymenu';
	},
	clickMantis : function (btnObj) {
		var me = this;
		var ret = window.open("http://180.67.220.138:808","WIS 개선요청","toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=800,height=600");
	},
	clickBarobillJoin : function(){
		var me = this;
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('bzpl','사업장'),
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'bzpl_name',
					pair		: 'bzpl_idcd',
					clearable	: false ,
					popup: {
						select : 'SINGLE',
						widget : 'lookup-bzpl-popup',
						params : { stor_grp : _global.stor_grp },
						result : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('bzpl_name'));
							pairField.setValue(records[0].get('bzpl_idcd'));
							form.down('[name=buss_numb]').setValue(records[0].get('buss_numb'));
							form.down('[name=buss_name]').setValue(records[0].get('buss_name'));
							form.down('[name=boss_name]').setValue(records[0].get('boss_name'));
							form.down('[name=buss_type]').setValue(records[0].get('buss_type'));
							form.down('[name=buss_kind]').setValue(records[0].get('buss_kind'));
							form.down('[name=addr_1fst]').setValue(records[0].get('addr_1fst'));
							form.down('[name=addr_2snd]').setValue(records[0].get('addr_2snd'));
						}
					}
				},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
				},{	fieldLabel	: Language.get('buss_numb','사업자등록번호'),
					name		: 'buss_numb',
					xtype		: 'textfield',
				},{	fieldLabel	: Language.get('buss_name','사업명'),
					name		: 'buss_name',
					xtype		: 'textfield'
				},{	fieldLabel	: Language.get('boss_name','대표자명'),
					name		: 'boss_name',
					xtype		: 'textfield'
				},{	fieldLabel	: Language.get('buss_type','업태'),
					name		: 'buss_type',
					xtype		: 'textfield'
				},{	fieldLabel	: Language.get('buss_kind','업종'),
					name		: 'buss_kind',
					xtype		: 'textfield'
				},{	fieldLabel	: Language.get('addr_1fst','주소'),
					name		: 'addr_1fst',
					xtype		: 'textfield'
				},{	fieldLabel	: Language.get('addr_2snd','상세주소'),
					name		: 'addr_2snd',
					xtype		: 'textfield'
				},{	fieldLabel	: Language.get('lgin_idcd','로그인ID'),
					xtype		: 'textfield',
					name		: 'lgin_idcd',
					minLength	: 6,
					maxLength	: 20,
				},{	fieldLabel	: Language.get('lgin_pswd','로그인PW'),
					xtype		: 'textfield',
					name		: 'lgin_pswd',
					inputType	: 'password',
					minLength	: 6,
					maxLength	: 20
				},{	fieldLabel	: Language.get('tele_numb','전화번호'),
					xtype		: 'textfield',
					name		: 'tele_numb',
					vtype		: 'mobile'
				},{	fieldLabel	: Language.get('mail_addr','이메일'),
					xtype		: 'textfield',
					name		: 'mail_addr',
					vtype		: 'email',
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:1em">확인</span>',
					cls: 'button-style',
					flex:1,
					handler: function() {
						var values = form.getValues();
						var chk = 0;
						var button = this;
						Ext.Ajax.request({
							url			: _global.location.http() + '/barobill/get/baro_logn.do',
							params		: {
								token	: _global.token_id ,
								param	: JSON.stringify({
									stor_id	: _global.stor_id,
									user_idcd : _global.login_pk,
									buss_numb : form.down('[name=buss_numb]').getValue()
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								console.log(result);
								if(result.records.length ==0){
									chk = 0;
								}else{
									chk = 1;
								}
							}
						});
						if(chk ==0){
							var param = Ext.merge({user_idcd : _global.login_pk, login_nm : _global.login_nm},values);
							Ext.Ajax.request({	//test
								url			: _global.location.http() + '/barobill/set/barobillJoin.do',
								params		: {
									token	: _global.token_id ,
									param	: JSON.stringify(param)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if(result.records[0]){
										if(result.records[0].result!=""){
											Ext.Msg.alert('알림',result.records[0].result);
										}
									}
									form.getForm().reset();
									button.up('window').destroy();
								}
							});
						}else{
							Ext.Msg.alert('알림','이미 등록된 아이디가 있습니다.');
						}
					}
				},{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
					cls: 'button-style',
					flex:1,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:10px; color:black;">회원가입</span>',
			closeAction: 'hide',
			width: 300,
			height: 430,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	},
	clickBarobillCert:function(){
		var	me = this;
		var id, pw, buss_numb ;
		Ext.Ajax.request({
			url			: _global.location.http() + '/barobill/get/baro_logn.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					user_idcd : _global.login_pk,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if(result.records.length ==0){
					chk = 0;
				}else{
					id = result.records[0].lgin_idcd;
					pw = result.records[0].lgin_pswd;
					buss_numb = result.records[0].buss_numb;
				}
			}
		});
		if(id){
			var code = '';
			Ext.Ajax.request({
				url			: _global.location.http() + '/barobill/get/barobillURL.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						lgin_idcd  : id,
						lgin_pswd  : pw,
						buss_numb  : buss_numb,
						togo       : 'CERT'
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					code = result.records
				}
			});
			if(code.indexOf("https")==0){
				window.open(code,"공동인증서등록","toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=800,height=600");
			}else{
				Ext.Msg.alert('알림',code);
			}

		}else{
			Ext.Msg.alert('알림','등록된 아이디가 없습니다. 회원가입 진행 후 시도해주세요.');
		}
	},
	/** 마이메뉴 모드일때 tree를 접었다 펼치는경우
	 *  Tree의 filter가 풀려버리므로 아래와같이 처리
	 **/
	itemexpandMyMenu : function(thisObj, eOpts) {
		var me = this;
		if(me.mainMenuViewType === 'mymenu') {
			me.filterMyMenu();
		}
	},

	/** 마이메뉴에서 사용되는 필터
	 *  ext js 4.1현재 TreeStore에 filter 기능이 없으므로
	 *  임시 방편으로 오픈소스로 되어있는 TreeFilter.js를 활용하여 filter를 쓴다.
	 * */
	filterMyMenu : function () {
		var me = this;
		var mainMenuTree = me.getMenuTree();
		var mainMenuStore = me.getStore('main.MainMenu');
		mainMenuTree.filterBy(function(record){
			// root또는 my menu인것은 통과
			if(record.raw.id === 'root' || record.raw.resource.mymenu_yn === '1') {
				return true;
			} else {
				return false;
			}
		});
	},

	/**
	 * tree메뉴에 우클릭했을때 나오는 context메뉴 이벤트
	 */
	itemContextMenu : function ( thisObj, record, item, index, e, eOpts ) {
		var me = this;
		e.stopEvent(); // 이벤트를 멈춰야 브라우저의 기본 context menu가 나오지 않는다.!!

		var isFolder = !record.get('leaf');
		if( isFolder ) { // 폴더
			return false;
		}
		// 우클릭시 나올 메뉴 생성
		var rightMenu = Ext.create("Ext.menu.Menu",{
           items : [
                {   text	: '마이메뉴 등록',
                    handler : function (obj) {
                    	me.itemContextMenuEditAjax(record, '1');
                    }
                },{ text	: '마이메뉴 해제',
                	handler : function (obj) {
                		me.itemContextMenuEditAjax(record, '0');
                	}
                }
            ]
        });

		// 클릭한 좌표에 context menu 보여주기
		rightMenu.showAt(e.getXY());
	},

	itemContextMenuEditAjax : function (record, mymenu_yn) {
		var me = this;
		var mymenu_yn_nm = mymenu_yn==='1'?'등록을':'해제를';

		var param = {
			menu_id		: record.get('id'),
			login_pk	: _global.login_pk, // emp_id
			mymenu_yn	: mymenu_yn
		};
		Ext.Ajax.request({
			url : _global.api_host_info + '/' + _global.app_site + '/auth/editMyMenu.do',
			params : {
				param : JSON.stringify(param),
				token : _global.token_id
			},
			success : function(response, opts) {
				record.raw.resource.mymenu_yn = mymenu_yn;
				Ext.Msg.alert('', '마이메뉴 ' + mymenu_yn_nm + ' 를(을) 추가하였습니다.');
				if(me.mainMenuViewType === 'mymenu') {
					me.clickMymenu();
				}
			},
			failure : function(response, opts) {
				Ext.Msg.alert('', '마이메뉴 ' + mymenu_yn_nm + ' 를(을) 추가하지 못하였습니다.');
			}
		});
	}

});
