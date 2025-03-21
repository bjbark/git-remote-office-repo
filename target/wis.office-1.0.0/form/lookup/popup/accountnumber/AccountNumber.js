Ext.define('lookup.popup.accountnumber.AccountNumber', { extend: 'Axt.popup.Search',

	id		: 'lookup-accountnumber-popup',
	alias	: 'widget.lookup-accountnumber-popup',

	store	: 'lookup.popup.accountnumber.store.AccountNumber',
	title	: Language.get( '' , '계좌번호 찾기') ,
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
				xtype	: 'form-layout',
				region	: 'center',
				border	:false,
				dockedItems : [ me.searchForm() ] , items : [ me.createGrid() ]
			};
		return form;
	},
	searchForm: function(){
		var me = this,
			form = {
				xtype			: 'form-search',
				bodyStyle		: { padding: '0', background: 'transparent' },
				layout			: { type: 'vbox' },
				fieldDefaults	: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
				dockedItems		: [
					{	xtype	: 'toolbar',
						dock	: 'top',
						items	: [
							{	xtype		: 'searchfield',
								itemId		: 'initfocused',
								name		: 'account_num',
								fieldLabel	: '모계좌번호',
								labelWidth	: 59, height : 22, width : 200
							},{	xtype : 'tbseparator'
							},{	xtype : 'button'     , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction
							},{	xtype : 'tbfill'
							}
						]
					},{	xtype : 'container'  , layout: 'border', border : 0 , height: 3
					}
				],
				items :	[]
			};
		return form;
	},
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
				columns	: [
					{	dataIndex: 'account_num',		width: 100, align:'left'  , text: '계좌번호'   , summaryType : 'count'
					},{	dataIndex: 'base_account_id',	width: 100, align:'left'  , text: '모계좌번호'
					},{	dataIndex: 'bank_nm',			width: 150, align:'left'  , text: '은행명'
					},{	dataIndex: 'owner_nm',			width:  90, align:'left'  , text: '예금주'
					},{	dataIndex: 'user_memo',			flex : 100, align:'left'  , text: '메모'
					}
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
							{	key: Ext.EventObject.ENTER,
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

	 finishAction: function(){
		var  me    = this,
			 panel   = me.down('grid'),
			 selects = panel.getSelectionModel().getSelection(),
			 request = []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						account_id  : eachrow.get('account_id'),
						account_num : eachrow.get('account_num'),
						account_nm  : eachrow.get('account_nm'),
										stor_id    : eachrow.get('stor_id')
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
