Ext.define('lookup.popup.project.HostInfoPopup', { extend: 'Axt.popup.Search',

	alias: 'widget.lookup-hostinfo-popup',
	store: 'lookup.popup.project.store.HostInfoPopup',
	title: '서버 선택' ,

	closable: true,
	autoShow: true,
	width: 750,
	height: 500,
	layout: {
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
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this, form = {
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm() ] ,
			items : [ me.createGrid() ]
		};
		return form;
	},
	/**
	 * 검색폼
	 */
	searchForm: function(){
		var me = this, form =  {
			xtype: 'form-search',
			bodyStyle: { padding: '0', background: 'transparent' },
			dockedItems : [
				{
					xtype : 'toolbar',
					dock: 'top',
					items: [
						{
							xtype		: 'searchfield',
							itemId		: 'initfocused',
							name		: 'host_nm',
							fieldLabel	: '호스트명',
							labelWidth	: 59, height : 22, width : 200 , labelAlign : 'right'
						},{
							xtype		: 'tbseparator'
						},{
							fieldLabel	: '운영구분' ,
							name		: 'host_gb'  ,
							xtype		: 'lookupfield',
							editable	: false ,
							labelWidth	: 59, height : 22, width : 200 , labelAlign : 'right',
							lookupValue : resource.getList('search_all').concat(resource.getList('server_gb') ) ,
							value		: ''
						},{
							fieldLabel	: '관리업체' ,
							xtype		: 'lookupfield',
							name		: 'host_grp',
							editable	: false ,
							labelWidth	: 59, height : 22, width : 200 , labelAlign : 'right',
							lookupValue	: resource.getList('search_all').concat( resource.getList('host_grp') ),
							value		: ''
						},{
							xtype : 'button'     , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction, cls: 'button-style'
						},{
							xtype : 'tbfill'
						}
					]
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 3
				}
			],
			layout: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items :	[] // 기타 검색 조건이 필요한 경우
		};
		return form;
	},
	/**
	 * 리스트
	 */
	createGrid: function(){
		var me = this,
			grid = {
			xtype: 'grid-panel',
			header : false,
			region: 'center',
			viewConfig: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
			},
			selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
			store		: Ext.create( me.store ),
			paging		: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
				]
			},
			columns:[
				{ text: '호스트'		, dataIndex: 'host_cd', width: 120 , align : 'center'} ,
				{ text: '호스트명'	, dataIndex: 'host_nm', width: 200 },
				{ text: '설치OS'		, dataIndex: 'host_os', width: 150 , xtype : 'lookupcolumn' , lookupValue : resource.getList('server_os' ) , align : 'center' },
				{ text: 'IP 정보'	, dataIndex: 'host_ip', width: 150 },
				{ text: 'DHCP IP'	, dataIndex: 'dhcp_ip', width: 150 },

			],
			listeners: {
				itemdblclick: function(dataview, index, item, e) {
					me.finishAction();
				},
				 render: function(){
					var me = this
					;
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
		var me    = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				if (me.popup.values && me.popup.values.barcode) {
					delete me.popup.values.barcode ;
				}
			}
		});
	},

	/**
	 * 확인 버튼 이벤트
	 */
	 finishAction: function(){
		var me    = this,
			panel    = me.down('grid'),
			selects = panel.getSelectionModel().getSelection(),
			request = []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						host_id : eachrow.get('host_id'),
						host_cd : eachrow.get('host_cd'),
						host_nm : eachrow.get('host_nm')
					});
				});
				var store = Ext.create( me.store );
					param = Ext.merge( me.popup.params, {
						records : request
					});
					store.getProxy().api.read = me.popup.apiurl.master ;
					store.load({
						params   : {param:JSON.stringify(param)},
						scope    : me,
						callback : function(records, operation, success) {
							if (success) {
								me.setResponse(records);
							}
					}
					});
			} else {
				me.setResponse(selects);
			}
		}
	}
});
