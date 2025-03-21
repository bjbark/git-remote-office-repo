Ext.define('module.user.userauth.view.UserAuthCopyPopup', { extend: 'Axt.popup.Search',
	alias	: 'widget.module-userauth-copypopup',
	store	: 'module.user.userauth.store.UserAuthCopyPopup',
	title	: Language.get( 'usr_select' , '사용자 선택') ,
	closable: true,
	autoShow: true,
	width	: 700,
	height	: 500,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
	},
	createForm: function(){
		var me = this,
			form = {
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm() ] , items : [ me.createGrid() ]
		};
		return form;
	},
	searchForm: function(){
		var me = this,
			form = {
				xtype		: 'form-search',
				bodyStyle	: { padding: '0', background: 'transparent' },
				dockedItems	: [
					{	xtype	: 'toolbar',
						dock	: 'top',
						items	: [
							{	xtype	: 'fieldset' ,
								border	: 3,
								flex	: 1,
								style	: { borderColor	: '#263c63', borderStyle	: 'solid'
								},
								region	: 'center',
								height	: 34,
								margin	: '3 3 3 0',
								layout	: 'hbox',
								items	: [
									{	xtype	: 'label',
										text	: 'SEARCH  | ',
										margin	: '7 10 0 0',
										cls		: 'my-label-style',
									},{	name	: 'find_name'     ,
										xtype	: 'searchfield',
										margin	: '3 10 0 0',
										flex	: 1,
									}
								]
							},{xtype : 'button'     , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction, cls: 'button-style',height  : 34
							},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
							}
						]
					},{	xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
					}
				],
				layout       : { type: 'vbox' },
				fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
				items        : [] // 기타 검색 조건이 필요한 경우
			};
		return form;
	},


	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype	: 'grid-panel',
				header	: false,
				region	: 'center',
				viewConfig: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create( me.store ),
				paging	: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{	xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{	xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }//,// '-' ,
				]
				},
				columns :[
					{	text : Language.get('user_name','사용자명')	, dataIndex: 'user_name'	, width : 100 , summaryType : 'count'
					},{ text : Language.get('lgin_idcd','로그인ID')	, dataIndex: 'lgin_idcd'	, width :  80
					},{ text : Language.get('dept_name','부서' 	)	, dataIndex: 'dept_name'	, width :  90
					},{ text : Language.get('auth_dvcd','사용권한')	, dataIndex: 'auth_dvcd'	, width :  90 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('auth_gb')
					}
				],
			listeners : {
				itemdblclick: function(dataview, index, item, e) {
					me.finishAction();
				},
				render: function(){
					var me = this;
					new Ext.util.KeyMap({
						target: me.getEl(),
						eventName : 'keyup',
						binding:[
							{
								key: Ext.EventObject.ENTER,
								fn: function(key,e){
								me.fireEvent('itemdblclick', me.getView() );
								}
							}
						]
					});
				}
			}
		};
		return grid;
	},
	/**
	 * 조회
	 */
	selectAction: function(){
		var me     = this,
			store  = me.down('grid').getStore(),
			master = Ext.ComponentQuery.query('module-userauth-lister-master')[0],
			select = master.getSelectionModel().getSelection()[0],
			param  = Ext.merge( me.down('form').getValues(), {
			}, me.popup.params )
		;
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				records.forEach( function ( model){
					model.set('new_user_idcd', select.get('user_idcd') );
					model.set('updt_idcd', _global.login_pk );
					model.set('crte_idcd', _global.login_pk );
				});
			}
		});
	},

	/**
	 * 선택
	 */
	finishAction: function(){
		var me    = this,
			panel        = me.down('grid'),
			selects      = panel.getSelectionModel().getSelection()[0],
			store        = panel.getStore(),
			master       = Ext.ComponentQuery.query('module-userauth-lister-master')[0],
			selectmaster = master.getSelectionModel().getSelection()[0],
			detail       = Ext.ComponentQuery.query('module-userauth-lister-detail')[0]
		;
		if (selects.length <= 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (selects.get('user_idcd') == selectmaster.get('user_idcd')) {
				Ext.Msg.show({ title: '오류', msg: '동일한 사용자를 선택하셨습니다.', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
				});
				return;
			} else{
				store.data.items.forEach( function( record ){
					if( record.get('user_idcd') == selects.get('user_idcd')) {
						record.dirty = true ;
					} else {
						record.dirty = false ;
					}
				});
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();

				store.sync({
					success : function(operation){
						console.debug( 'success', operation );
						/* 권한 가져오기 성공 후 메뉴 상세내역 조회 */
						detail.getStore().load({
							//detail.select({
							params:{param:JSON.stringify({	user_idcd	: selectmaster.get('user_idcd'),
															stor_grp		: _global.stor_grp,
															site_id		: _global.app_site,
															pjt_id		: _global.solution
														})},
							scope    :me,
							callback : function(records, operation, success) {
								if (success) {
									detail.getRootNode().expand();
									detail.getRootNode().cascadeBy(function( record ) {
										if (record.internalId != 'root') {
											if (selectmaster.get('line_stat') != 0) {
												selectmaster.set('active_yn' , false);
											}
										}
									});
									detail.getSelectionModel().select(0);
								} else {
								}
								mask.hide();
							}, scope    : me
						});
						Ext.Msg.alert('알림',  '권한 가져오기에 성공 하셨습니다.' );
					}, // 저장 성공시
					failure : function(operation){
					}, // 저장 실패시 호출
					callback: function(batch, options) {
					},
					scope: me
				});
				mask.hide();
				me.close();
			}
		}
	}
});